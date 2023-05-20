import { useWeb3Connect, useContractConnect } from "@/services";
import { useStore } from "@/store";
import { Button, Typography } from "@mui/material";

export const Wallet = () => {
  const client = useStore((state) => state.client);
  const { connectWeb3 } = useWeb3Connect();
  const { callPostMessage } = useContractConnect();

  if (client && client.isConnected)
    return (
      <>
        <Button variant="contained"> Disconnect</Button>
        <Button variant="contained" onClick={() => callPostMessage("a", "b")}>
          Call contract
        </Button>
        <Typography variant="h6">{client.address}</Typography>
      </>
    );

  return (
    <Button variant="contained" onClick={connectWeb3}>
      Connect
    </Button>
  );
};
