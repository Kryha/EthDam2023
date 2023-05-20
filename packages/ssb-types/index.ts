export type ScuttleBot = any;
export type SBConnection = Promise<ScuttleBot>;

export type MessageContent = { message: string; special?: boolean; username: string };
export type Message = {
  id: string;
  content: MessageContent;
  author: string;
  previousId: string | undefined | null;
  timestamp: number;
  type: string;
};