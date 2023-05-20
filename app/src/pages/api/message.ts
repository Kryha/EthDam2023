// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as ssb from "@blockbusters/ssb-core";
import { Message } from "@blockbusters/ssb-types";
import { stringToAnimalName } from "@blockbusters/util-animal-names";

type GetData = {
  top: Message[];
  all: Message[];
};

type PostData = {
  messageId: string;
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

ssb.readMessages(cb, { limit });

function GET(req: NextApiRequest, res: NextApiResponse<GetData>) {
  res.status(200).json({ top: topMessages, all: allMessages });
}

async function POST(
  req: NextApiRequest,
  res: NextApiResponse<PostData | void>
) {
  if (!req.body.message) {
    res.status(400).send();
    return;
  }

  const { id } = await ssb.whoami();
  const username = stringToAnimalName(id);

  const messageId = await ssb.postMessage({
    message: req.body.message,
    special: req.body.special,
    username,
  });

  res.status(200).json({ messageId });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    case "POST":
      return POST(req, res);
    default:
      throw new Error("req.method not allowed");
  }
}
