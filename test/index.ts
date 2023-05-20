import { stringToAnimalName } from "@blockbusters/util-animal-names";
import * as ssb from "@blockbusters/ssb";

async function main() {
  ssb.postMessage({ message: "test", username: stringToAnimalName("poep") });

  const messages = ssb.readMessages();
  for await (const x of messages) {
    console.log(x);
  }
}

main();
