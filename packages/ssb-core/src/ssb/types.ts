import { z } from "zod";
export * from "@blockbusters/ssb-types";

export const MESSAGE_TYPE = "post";
export const ALLOWED_MESSAGE_TYPES = [MESSAGE_TYPE] as const;

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

export type ScuttleBotMessage = z.infer<typeof scuttleBotMessageSchema>;

export function isScuttleBotMessage(unknown: unknown): unknown is ScuttleBotMessage {
  const { success } = scuttleBotMessageSchema.safeParse(unknown);
  return success;
}

export type ReadStreamOptions = {
  live?: boolean; // (boolean, default: true): Keep the stream open and emit new messages as they are received.
  reverse?: boolean; // reverse (boolean, default: true): a boolean, set true and the stream output will be reversed. Beware that due to the way LevelDB works, a reverse seek will be slower than a forward seek.
  limit?: number; // (number, default: -1): limit the number of results collected by this stream. This number represents a maximum number of results and may not be reached if you get to the end of the data first. A value of -1 means there is no limit. When reverse=true the highest keys will be returned instead of the lowest keys.}
};


export type MessageContent = { message: string; special?: boolean; username: string };
export type Message = {
  id: string;
  content: MessageContent;
  author: string;
  previousId: string | undefined | null;
  timestamp: number;
  type: string;
};
