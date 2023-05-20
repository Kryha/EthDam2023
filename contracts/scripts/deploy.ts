import { ethers } from "hardhat";

export async function main() {
  const VotingTokens = await ethers.getContractFactory("MessageVoting");
  const votingTokens = await VotingTokens.deploy();

  const txHash = votingTokens.deployTransaction.hash;
  const txReceipt = await ethers.provider.waitForTransaction(txHash);
  console.log("Contract deployed to address:", txReceipt.contractAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
