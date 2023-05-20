import { stringToAnimalName } from "@blockbusters/util-animal-names";
import * as ssb from "@blockbusters/ssb-core";
import { connect } from "@blockbusters/ssb-backend";

async function main() {
  const connection = connect();
  ssb.setConnection(connection);

  ssb.postMessage({ message: "test0", username: stringToAnimalName("poep") });

  ssb.readMessages((msg) => {
    console.log(msg.content);
  });

  ssb.postMessage({ message: "test1", username: stringToAnimalName("poep") });

  ssb.postMessage({ message: "test2", username: stringToAnimalName("poep") });

  ssb.postMessage({ message: "test3", username: stringToAnimalName("poep") });
}

main();
