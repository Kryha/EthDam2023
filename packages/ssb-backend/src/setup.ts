import { SBConnection, ScuttleBot } from "@blockbusters/ssb-types";
// @ts-ignore
import ssbClient from "ssb-client";

export async function connect(): SBConnection {
  const sbot = await ssbClient();
  return sbot;
}
