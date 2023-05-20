import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Contract } from 'ethers';

describe('MessageVoting', () => {
  let messageVoting: Contract;

  beforeEach(async () => {
    const MessageVoting = await ethers.getContractFactory('MessageVoting');
    messageVoting = await MessageVoting.deploy();
    await messageVoting.deployed();
  });

  it('should post a message', async () => {
    const content = 'Hello, world!';
    const messageId = '123';
    
    await messageVoting.postMessage(content, messageId);

    const message = await messageVoting.getMessageById(messageId);
    expect(message.content).to.equal(content);
    expect(message.votes).to.equal(0);
    expect(message.messageId).to.equal(messageId);
  });

  it('should upvote a message', async () => {
    const content = 'Hello, world!';
    const messageId = '123';

    await messageVoting.postMessage(content, messageId);
    await messageVoting.upvote(messageId);

    const message = await messageVoting.getMessageById(messageId);
    expect(message.votes).to.equal(1);
  });

  it('should downvote a message', async () => {
    const content = 'Hello, world!';
    const messageId = '123';

    await messageVoting.postMessage(content, messageId);
    await messageVoting.downvote(messageId);

    const message = await messageVoting.getMessageById(messageId);
    expect(message.votes).to.equal(-1);
  });

  it('should get sorted messages by votes', async () => {
    const content1 = 'Message 1';
    const content2 = 'Message 2';
    const content3 = 'Message 3';
    const messageId1 = '1';
    const messageId2 = '2';
    const messageId3 = '3';

    await messageVoting.postMessage(content1, messageId1);
    await messageVoting.postMessage(content2, messageId2);
    await messageVoting.postMessage(content3, messageId3);

    await messageVoting.upvote(messageId1);
    await messageVoting.upvote(messageId2);
    await messageVoting.upvote(messageId2);
    await messageVoting.downvote(messageId3);

    const sortedMessages = await messageVoting.getSortedMessagesByVotes();

    console.log(sortedMessages);

    expect(sortedMessages[0].messageId).to.equal(messageId2);
    expect(sortedMessages[1].messageId).to.equal(messageId1);
    expect(sortedMessages[2].messageId).to.equal(messageId3);
  });
});
