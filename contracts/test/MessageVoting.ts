import { ethers } from "hardhat";
import { Signer, Contract } from "ethers";
import { expect } from "chai";

describe("MessageVoting", function () {
  let voteContract: Contract;

  before(async () => {
    const MessageVoting = await ethers.getContractFactory("MessageVoting");
    voteContract = await MessageVoting.deploy();
    await voteContract.deployed();
  });

  it("should upvote a message and return correct vote count", async function () {
    const messageId = "ABC";
    const voteCount = 10;

    await voteContract.upvote(messageId, voteCount);

    const expectedVoteCount = voteCount;
    const messageVoteCount = await voteContract.getMessageById(messageId);
    expect(messageVoteCount.toNumber()).to.equal(expectedVoteCount);
  });

  it("should downvote a message and return correct vote count", async function () {
    const messageId = "DEF";
    const voteCount = 5;

    await voteContract.downvote(messageId, voteCount);

    const expectedVoteCount = -voteCount;
    const messageVoteCount = await voteContract.getMessageById(messageId);
    expect(messageVoteCount.toNumber()).to.equal(expectedVoteCount);
  });

  it("should return the correct vote count for a message", async function () {
    const messageId = "GHI";
    const initialVoteCount = 0;

    const expectedVoteCount = initialVoteCount;
    const initialMessageVoteCount = await voteContract.getMessageById(
      messageId
    );
    expect(initialMessageVoteCount.toNumber()).to.equal(expectedVoteCount);

    const upvoteCount = 7;
    await voteContract.upvote(messageId, upvoteCount);
    const upvotedVoteCount = expectedVoteCount + upvoteCount;
    const upvotedMessageVoteCount = await voteContract.getMessageById(
      messageId
    );
    expect(upvotedMessageVoteCount.toNumber()).to.equal(upvotedVoteCount);

    const downvoteCount = 3;
    await voteContract.downvote(messageId, downvoteCount);
    const finalVoteCount = upvotedVoteCount - downvoteCount;
    const finalMessageVoteCount = await voteContract.getMessageById(messageId);
    expect(finalMessageVoteCount.toNumber()).to.equal(finalVoteCount);
  });
});
