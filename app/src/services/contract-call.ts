import { ethers } from "ethers";
import { useCallback } from "react";
import MessageVoting from "../abi/MessageVoting.json";
import { useStore } from "@/store";

export const useContractConnect = () => {
  const client = useStore((state) => state.client);

  const call = useCallback(async () => {
    if (client?.isConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        MessageVoting.abi,
        signer
      );
      try {
        const functionFragment = contract.interface.getFunction("downvote");
        console.log(functionFragment);
      } catch (e) {
        console.log(e);
      }
      return contract;
    }
  }, []);

  return { call };
};
