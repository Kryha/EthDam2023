// @ts-ignore
import ssbClient from "ssb-client";
import ssbKeys from "ssb-keys";
import pull from "pull-stream";

const MESSAGE_TYPE = "message";

async function createConnection() {
  const sbot = await ssbClient();
  return sbot;
}

const connection = createConnection();

type Message = { message: string; special?: boolean; username: string };
export async function postMessage(message: Message) {
  const sbot = await connection;

  await sbot.publish({
    type: MESSAGE_TYPE,
    text: JSON.stringify(message),
  });
}

type ReadStreamArgs = {
  live?: boolean; // (boolean, default: true): Keep the stream open and emit new messages as they are received.
  reverse?: boolean; // reverse (boolean, default: true): a boolean, set true and the stream output will be reversed. Beware that due to the way LevelDB works, a reverse seek will be slower than a forward seek.
  limit?: number; // (number, default: -1): limit the number of results collected by this stream. This number represents a maximum number of results and may not be reached if you get to the end of the data first. A value of -1 means there is no limit. When reverse=true the highest keys will be returned instead of the lowest keys.}
};

async function* _genericStream(type: string, args: ReadStreamArgs) {
  const sbot = await connection;
  const { live = true, reverse = true, limit = -1 } = args;

  const logStream = sbot.messagesByType({ type, live, reverse, limit });

  pull(logStream, pull.drain(yield));
}

export async function* readMessages(args?: ReadStreamArgs) {
  yield* _genericStream(MESSAGE_TYPE, args || {});
}

export async function whoami() {
  const sbot = await connection;
  return sbot.whoami();
}
