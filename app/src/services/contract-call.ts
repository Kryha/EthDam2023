import { ethers } from "ethers";
import MessageVoting from "../abi/MessageVoting.json";
import { useStore } from "@/store";

export const useContractConnectUpvote = () => {
  const client = useStore((state) => state.client);

  const callUpvote = async (messageId: string, amount: number) => {
    if (client?.isConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        MessageVoting.abi,
        signer
      );
      await contract.upvote(messageId, amount);
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
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        MessageVoting.abi,
        signer
      );
      await contract.downvote(messageId, amount);
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
      await contract.getMessageById(messageId);
      return contract;
    }
  };

  return { callGetMessageById };
};
