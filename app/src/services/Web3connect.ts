import { useStore } from "@/store";

export const useWeb3Connect = () => {
  const setHaveMetamask = useStore((state) => state.setHaveMetamask);
  const setClient = useStore((state) => state.setclient);

  const checkConnection = async () => {
    const { ethereum } = window;
    if (ethereum) {
      setHaveMetamask(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setClient({
          isConnected: true,
          address: accounts[0],
        });
      } else {
        setClient({
          isConnected: false,
        });
      }
    } else {
      setHaveMetamask(false);
    }
  };

  const connectWeb3 = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setClient({
        isConnected: true,
        address: accounts[0],
      });
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  return { connectWeb3, checkConnection };
};
