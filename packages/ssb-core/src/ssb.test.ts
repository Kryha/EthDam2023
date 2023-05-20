import { beforeAll, describe, expect, test } from "@jest/globals";
import { after } from "node:test";
import * as core from "./ssb";

const keys1 = {
  curve: "ed25519",
  id: "@xkgJow7CjglAfYLVSSmDkkc8rEeM3eJ0mPi8jTm7hZs=.ed25519",
  private:
    "Vb54hwZ09HK0iV3LiahnAFBfC/RMJIEpDUthA82Ad87GSAmjDsKOCUB9gtVJKYOSRzysR4zd4nSY+LyNObuFmw==.ed25519",
  public: "xkgJow7CjglAfYLVSSmDkkc8rEeM3eJ0mPi8jTm7hZs=.ed25519",
};

const conf1 = {
  host: "ethdam2023-go-ssb-1-1",
  port: 8008,
  key: keys1.id,
  caps: {
    shs: "1KHLiKZvAvjbY1ziZEHMXawbCEIM6qwjCDm3VYRan/s=",
  },
};
const keys2 = {
  curve: "ed25519",
  id: "@4VZr4YqV+7ZE+GkOFBw5nJ8vx7Zlfi9FHefqSdF648Q=.ed25519",
  private:
    "aTqO3r0d/BGXSgtdAk7WetjH2osSc+z42Pdikyu+RjjhVmvhipX7tkT4aQ4UHDmcny/HtmV+L0Ud5+pJ0XrjxA==.ed25519",
  public: "4VZr4YqV+7ZE+GkOFBw5nJ8vx7Zlfi9FHefqSdF648Q=.ed25519",
};
const conf2 = {
  host: "ethdam2023-go-ssb-2-1",
  port: 8009,
  key: keys2.id,
  caps: {
    shs: "1KHLiKZvAvjbY1ziZEHMXawbCEIM6qwjCDm3VYRan/s=",
  },
};

describe("ssb", () => {
  let ssbInstance1;
  let ssbInstance2;
  beforeAll(async () => {
    ssbInstance1 = await core.createInstance(keys1, conf1);
    ssbInstance2 = await core.createInstance(keys2, conf2);
  });

  after(async () => {
    await ssbInstance1.shutdown();
    await ssbInstance2.shutdown();
  });

  test("whoami", async () => {
    const whoami = await ssbInstance1.whoami();
    expect(whoami).toEqual({
      id: keys1.id,
    });
  });
  test("simple pull stream", async () => {
    const res = await ssbInstance1._pullStream({
      limit: 100,
      reverse: true,
    });
    expect(res).toStrictEqual([]);
  });
  test("follow user", async () => {
    const res1 = await ssbInstance1.followUser(keys2.id);
    const res2 = await ssbInstance2.followUser(keys1.id);
    expect(typeof res1).toStrictEqual("string");
    expect(typeof res2).toStrictEqual("string");
  });
  test("publish and pull", async () => {
    const msg = await ssbInstance2.postMessage('SDFSDFSDFsF');
    expect(msg).toStrictEqual(null);
    const res = await ssbInstance1.getUserStream();
    expect(res).toStrictEqual(null);
  });

});
