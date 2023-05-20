const ssb = require("@blockbusters/ssb-core")
const {
  connect
} = require("@blockbusters/ssb-frontend")

async function main() {
  const connection = connect()

  console.log(connection)

  ssb.setConnection(connection)

  await ssb.postMessage({
    message: "test0",
    username: "poep"
  });

  ssb.readMessages((msg) => {
    console.log(msg.content);
  });

  ssb.postMessage({
    message: "test1",
    username: "poep"
  });

  ssb.postMessage({
    message: "test2",
    username: "poep"
  });

  ssb.postMessage({
    message: "test3",
    username: "poep"
  });
}

main();