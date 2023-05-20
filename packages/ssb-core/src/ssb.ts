import pull from "pull-stream";
import { z } from "zod";
import { SBConnection, MessageContent, Message } from "@blockbusters/ssb-types";
// @ts-ignore
import ssbClient from "ssb-client";
// @ts-ignore
import ssbFeed from "ssb-feed";
import ssbKeys from "ssb-keys";

const MESSAGE_TYPE = "message";
const ALLOWED_MESSAGE_TYPES = [MESSAGE_TYPE] as const;

const scuttleBotMessageSchema = z.object({
	key: z.string(),
	value: z.object({
		previous: z.string().optional().nullable(),
		sequence: z.number(),
		author: z.string(),
		timestamp: z.number(),
		hash: z.string(),
		content: z.object({
			type: z.enum(ALLOWED_MESSAGE_TYPES),
			text: z.string(),
		}),
		signature: z.string(),
	}),
	timestamp: z.number(),
});

type ScuttleBotMessage = z.infer<typeof scuttleBotMessageSchema>;

function isScuttleBotMessage(unknown: unknown): unknown is ScuttleBotMessage {
	const { success } = scuttleBotMessageSchema.safeParse(unknown);
	return success;
}

const connection = connect();
function connect(): SBConnection {
	return ssbClient();
}

type PostOptions = {ssbKeys?: ssbKeys.Keys}
export async function postMessage(message: MessageContent, options?: PostOptions): Promise<string> {
	const sbot = await connection;

	let feed = sbot
	if (options?.ssbKeys) {
		feed = ssbFeed(sbot, ssbKeys.generate())
	}

	return new Promise((resolve, reject) => {
		feed.publish(
			{
				type: MESSAGE_TYPE,
				text: JSON.stringify(message),
			},
			(err: Error, msg: ScuttleBotMessage) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(msg.key);
			}
		);
	});
}

type ReadStreamOptions = {
	live?: boolean; // (boolean, default: true): Keep the stream open and emit new messages as they are received.
	reverse?: boolean; // reverse (boolean, default: true): a boolean, set true and the stream output will be reversed. Beware that due to the way LevelDB works, a reverse seek will be slower than a forward seek.
	limit?: number; // (number, default: -1): limit the number of results collected by this stream. This number represents a maximum number of results and may not be reached if you get to the end of the data first. A value of -1 means there is no limit. When reverse=true the highest keys will be returned instead of the lowest keys.}
};

function _simplifySbotMsg(msg: ScuttleBotMessage): Message {
	return {
		id: msg.key,
		content: JSON.parse(msg.value.content.text) as MessageContent,
		author: msg.value.author,
		previousId: msg.value.previous,
		type: msg.value.content.type,
		timestamp: msg.timestamp,
	};
}

async function _genericStream(cb: (msg: any) => Promise<void> | void, type: string, args: ReadStreamOptions) {
	const sbot = await connection;
	const { live = true, reverse = false, limit = -1 } = args;

	const logStream = sbot.createLogStream({ type, live, reverse, limit });

	pull(
		logStream,
		pull.drain((msg: unknown) => {
			if (!isScuttleBotMessage(msg)) {
				console.log(`Unknown message detected: ${JSON.stringify(msg)}; ignoring`);
				return;
			}

			cb(_simplifySbotMsg(msg));
		})
	);
}

export async function readMessages(cb: (msg: Message) => Promise<void> | void, options?: ReadStreamOptions) {
	_genericStream(cb, MESSAGE_TYPE, options || {});
}

export async function whoami(): Promise<{ id: string }> {
	const sbot = await connection;
	return sbot.whoami();
}
