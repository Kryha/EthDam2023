import { stringToAnimalName } from "@blockbusters/util-animal-names";
import * as ssb from "@blockbusters/ssb-core";
import { generateSpam } from "@blockbusters/util-generate-spam";
import ssbKeys from "ssb-keys";

const MAX_USERS = 50;
const MAX_MESSAGES_A_SECOND = 100;
const RANDOM_SPECIAL_CHANCE = 0.001;
const RANDOM_NEW_USER_CHANCE = 0.05;

const users: ssbKeys.Keys[] = [];

function msleep(n: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

const getUserIndex = () =>
  Math.max(Math.round(Math.random() * users.length) - 1, 0);

for (let i = 0; i < MAX_USERS; i++) {
  users.push(ssbKeys.generate());
}

async function main() {
  while (true) {
    for (let i = 0; i < MAX_MESSAGES_A_SECOND; i++) {
      const userIndex = getUserIndex();
      const message = generateSpam();
      const user = users[userIndex];
      const username = stringToAnimalName(user.id);
      const special = Math.random() < RANDOM_SPECIAL_CHANCE;

      let result = await ssb.postMessage(
        { message, username, special },
        { ssbKeys: user }
      );
      console.log(result);

      if (RANDOM_NEW_USER_CHANCE) {
        users[userIndex] = ssbKeys.generate();
      }
    }

    msleep(1000);
  }
}
main();
