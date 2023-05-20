// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as ssb from "@blockbusters/ssb-core";
import { Message } from "@blockbusters/ssb-types";

type Data = {
  top: Message[];
  all: Message[];
};

const limit = 100;
const topMessages: Message[] = [];
const allMessages: Message[] = [];

const cb = (msg: Message) => {
  if (msg.content.special) {
    if (topMessages.length > limit) {
      topMessages.pop();
    }
    topMessages.unshift(msg);
  }

  if (allMessages.length > limit) {
    allMessages.pop();
  }
  allMessages.unshift(msg);
};

ssb.readMessages(cb);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ top: topMessages, all: allMessages });
}
