import { useWeb3Connect, useContractConnectPost, useContractConnectUpvote, useContractConnectDownvote, useContractGetMessageById } from "@/services";
import { useStore } from "@/store";
import { Button, Typography } from "@mui/material";

export const Wallet = () => {
  const client = useStore((state) => state.client);
  const { connectWeb3 } = useWeb3Connect();
  const { callPostMessage } = useContractConnectPost();
  const { callUpvote } = useContractConnectUpvote();
  const { callDownvote } = useContractConnectDownvote();
  const { callGetMessageById } = useContractGetMessageById();




  if (client && client.isConnected)
    return (
      <>
        <Button variant="contained"> Disconnect</Button>
        <Button variant="contained" onClick={() => callPostMessage("a", "b")}>
          Call contract Post
        </Button>
        <Button variant="contained" onClick={() => callUpvote("b")}>
          Call contract upvote
        </Button>
        <Button variant="contained" onClick={() => callDownvote("b")}>
          Call contract downvote
        </Button>
        <Button variant="contained" onClick={() => callGetMessageById("b")}>
          Call contract get message Id
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
