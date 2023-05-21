import {
  useWeb3Connect
} from "@/services";
import { useStore } from "@/store";
import { Button, Typography } from "@mui/material";

export const Wallet = () => {
  const client = useStore((state) => state.client);
  const { connectWeb3 } = useWeb3Connect();

  if (client && client.isConnected)
    return (
      <>
        <Button variant="contained"> Disconnect</Button>
        <Typography variant="h6">{client.address}</Typography>
      </>
    );

  return (
    <Button variant="contained" onClick={connectWeb3}>
      Connect
    </Button>
  );
};
