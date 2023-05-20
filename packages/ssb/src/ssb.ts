// @ts-ignore
import ssbClient from "ssb-client";
import ssbKeys from "ssb-keys";
import pull from "pull-stream";
import { z } from "zod";

const MESSAGE_TYPE = "message";

const scuttleBotMessageSchema = z.object({
  key: z.string(),
  value: z.object({
    previous: z.string().optional(),
    sequence: z.number(),
    author: z.string(),
    timestamp: z.number(),
    hash: z.string(),
    content: z.object({
      type: z.string(),
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

type MessageContent = { message: string; special?: boolean; username: string };
type Message = {
  id: string;
  content: MessageContent;
  author: string;
  previousId?: string;
  timestamp: number;
  type: string;
};

async function createConnection() {
  const sbot = await ssbClient();
  return sbot;
}

const connection = createConnection();

export async function postMessage(message: MessageContent) {
  const sbot = await connection;

  await sbot.publish({
    type: MESSAGE_TYPE,
    text: JSON.stringify(message),
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

async function _genericStream(
  cb: (msg: any) => Promise<void> | void,
  type: string,
  args: ReadStreamOptions
) {
  const sbot = await connection;
  const { live = true, reverse = false, limit = -1 } = args;

  const logStream = sbot.messagesByType({ type, live, reverse, limit });

  pull(
    logStream,
    pull.drain((msg: unknown) => {
      if (!isScuttleBotMessage(msg)) {
        console.log(
          `Unknown message detected: ${JSON.stringify(msg)}; ignoring`
        );
        return;
      }

      cb(_simplifySbotMsg(msg));
    })
  );
}

export async function readMessages(
  cb: (msg: Message) => Promise<void> | void,
  options?: ReadStreamOptions
) {
  _genericStream(cb, MESSAGE_TYPE, options || {});
}

export async function whoami() {
  const sbot = await connection;
  return sbot.whoami();
}
