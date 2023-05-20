import { ScuttleBot } from "@blockbusters/ssb-types";
import pull from "pull-stream";
// @ts-ignore
import ssbClient from "ssb-client";
import { MessageContent, MESSAGE_TYPE, ReadStreamOptions } from "./types";

export async function createInstance(keys: any, config: any): Promise<any> {
  const server: ScuttleBot = await ssbClient(keys, config);
  const userId = keys.id;
  async function _pullStream(options: ReadStreamOptions) {
    return new Promise((resolve, reject) => {
      pull(
        server.createLogStream(options),
        pull.filter((msg) => {
          //return msg.content.type === "post";
          return msg;
        }),
        pull.collect(onDone)
      );

      function onDone(err, msgs) {
        if (err) {
          console.error(err);
          server.close();
          reject(err);
        }

        msgs.forEach((msg) => {
          console.log(JSON.stringify(msg, null, 2));
          console.log("------");
        });

        console.log(`${msgs.length} messages`);
        resolve(msgs);
      }
    });
  }

  async function followUser(userId: string) {
    return server.publish({
      type: "contact",
      contact: userId,
      following: true,
    });
  }

  async function getUserStream() {
    return new Promise((resolve, reject) => {
      pull(
        server.createFeedStream({ id: userId}),
        pull.collect(onDone)
      );

      function onDone(err, msgs) {
        if (err) {
          console.error(err);
          server.close();
          reject(err);
        }

        msgs.forEach((msg) => {
          console.log(JSON.stringify(msg, null, 2));
          console.log("------");
        });

        console.log(`${msgs.length} messages`);
        resolve(msgs);
      }
    });
  }

  async function whoami() {
    return server.whoami();
  }

  async function postMessage(message: MessageContent): Promise<any> {
    return new Promise((resolve, reject) => {
      server.publish(
        {
          type: MESSAGE_TYPE,
          text: JSON.stringify(message),
        },
        resolve
      );
    });
  }

  return {
    shutdown: () => server.close(),
    _pullStream,
    followUser,
    whoami,
    postMessage,
    getUserStream,
  };
}

// function _simplifySbotMsg(msg: ScuttleBotMessage): Message {
//   return {
//     id: msg.key,
//     content: JSON.parse(msg.value.content.text) as MessageContent,
//     author: msg.value.author,
//     previousId: msg.value.previous,
//     type: msg.value.content.type,
//     timestamp: msg.timestamp,
//   };
// }
