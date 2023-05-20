import fs from "fs";
import path from "path";

const spamMessages = fs
  .readFileSync(path.join(__dirname, "spam.txt"))
  .toString()
  .split("\n");


const spamLength = spamMessages.length;

export function generateSpam(): string {
  let random = Math.round(Math.random() * spamLength);

  const index = random % spamLength;
  return spamMessages[index];
}
