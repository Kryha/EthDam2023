import { ethers } from "ethers";
import { useCallback } from "react";
import MessageVoting from "../abi/MessageVoting.json";
import { useStore } from "@/store";

export const useContractConnectPost = () => {
  const client = useStore((state) => state.client);

  const callPostMessage = async (messageContent: string, messageId: string) => {
    if (client?.isConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        MessageVoting.abi,
        signer
      );
      const transaction = await contract.postMessage(messageContent, messageId);
      const transactionReceipt = await transaction.wait();
      if (transactionReceipt.status !== 1) {
          alert('error message');
          return;
      }
      return contract;
    }
  };

  return { callPostMessage };
};

export const useContractConnectUpvote = () => {
  const client = useStore((state) => state.client);

  const callUpvote = async (messageId: string) => {
    if (client?.isConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        MessageVoting.abi,
        signer
      );
      const transaction = await contract.upvote(messageId);
      const transactionReceipt = await transaction.wait();
      if (transactionReceipt.status !== 1) {
          alert('error message');
          return;
      }
      return contract;
    }
  };

  return { callUpvote };
};


export const useContractConnectDownvote = () => {
  const client = useStore((state) => state.client);

  const callDownvote = async (messageId: string) => {
    if (client?.isConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        MessageVoting.abi,
        signer
      );
      const transaction = await contract.downvote(messageId);
      const transactionReceipt = await transaction.wait();
      if (transactionReceipt.status !== 1) {
          alert('error message');
          return;
      }
      return contract;
    }
  };

  return { callDownvote };
};


export const useContractGetMessageById = () => {
  const client = useStore((state) => state.client);

  const callGetMessageById = async (messageId: string) => {
    if (client?.isConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        MessageVoting.abi,
        signer
      );
      const transaction = await contract.getMessageById(messageId);
      console.log("transaction", transaction)
      //const transactionReceipt = await transaction.wait();
      // if (transactionReceipt.status !== 1) {
      //     alert('error message');
      //     return;
      // }
      return contract;
    }
  };

  return { callGetMessageById };
};