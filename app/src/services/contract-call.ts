import { ethers } from "ethers";
import MessageVoting from "../abi/MessageVoting.json";
import { useStore } from "@/store";
import { CONTRACT_ADDRESS } from "@constants";

export const useContractConnectPost = () => {
  const client = useStore((state) => state.client);

  const callPostMessage = async (messageContent: string, messageId: string) => {
    if (client?.isConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MessageVoting.abi,
        signer
      );
      const transaction = await contract.postMessage(messageContent, messageId);
      const transactionReceipt = await transaction.wait();
      if (transactionReceipt.status !== 1) {
        alert("error message");
        return;
      }
      return contract;
    }
  };

  return { callPostMessage };
};

export const useContractConnectUpvote = () => {
  const client = useStore((state) => state.client);

  const callUpvote = async (messageId: string, amount: number) => {
    if (client?.isConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MessageVoting.abi,
        signer
      );
      await contract.upvote(messageId, amount);
      const transaction = await contract.upvote(messageId);
      const transactionReceipt = await transaction.wait();
      if (transactionReceipt.status !== 1) {
        alert("error message");
        return;
      }
      return contract;
    }
  };

  return { callUpvote };
};

export const useContractConnectDownvote = () => {
  const client = useStore((state) => state.client);

  const callDownvote = async (messageId: string, amount: number) => {
    if (client?.isConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MessageVoting.abi,
        signer
      );
      await contract.downvote(messageId, amount);
      const transaction = await contract.downvote(messageId);
      const transactionReceipt = await transaction.wait();
      if (transactionReceipt.status !== 1) {
        alert("error message");
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
        CONTRACT_ADDRESS,
        MessageVoting.abi,
        signer
      );
      const transaction = await contract.getMessageById(messageId);
      console.log("transaction", transaction);
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
