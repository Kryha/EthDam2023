import { SBConnection, ScuttleBot } from "@blockbusters/ssb-types";
// @ts-ignore
import ssbSingleton from "ssb-browser-core/ssb-singleton";

function extraModules(secretStack: any) {
  // add extra modules here
  return secretStack;
}

// in case you want to add or overwrite something from here
// https://github.com/arj03/ssb-browser-core/blob/master/net.js#L11
let config = {};

export async function connect(): SBConnection {
  return new Promise((resolve, reject) => {
    // setup ssb browser core
    ssbSingleton.setup("/.ssb", config, extraModules, () => {});

    ssbSingleton.getSimpleSSBEventually((err: Error, ssb: ScuttleBot) => {
      if (err) return reject(err);
      resolve(ssb);
    });
  });
}
