import { SBConnection, ScuttleBot } from "@blockbusters/ssb-types";
// @ts-ignore
import ssbClient from "ssb-client";

export async function connect(): SBConnection { 
  const sbot = await ssbClient(undefined, {
    host: "ethdam2023-go-ssb-1-1",
    port: 8008,
    key: "@xkgJow7CjglAfYLVSSmDkkc8rEeM3eJ0mPi8jTm7hZs=.ed25519"
  });

  return sbot;
}
