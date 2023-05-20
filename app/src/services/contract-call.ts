import { ethers } from "ethers";
import { useCallback } from "react";
import MessageVoting from "../abi/MessageVoting.json";
import { useStore } from "@/store";

export const useContractConnect = () => {
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

      const transaction2 = await contract.getSortedMessagesByVotes();
      const transactionReceipt2 = await transaction2.wait();
      console.log("tr2", transactionReceipt2);
      console.log("tr2", JSON.stringify(transactionReceipt2));
      if (transactionReceipt2.status !== 1) {
        alert('error message');
        return;
      }
      console.log("t2", await transaction2);

      return contract;
    }
  };

  return { callPostMessage };
};