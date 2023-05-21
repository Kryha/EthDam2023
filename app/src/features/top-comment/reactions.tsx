import { Box, Button, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import { useCommentsStore } from "@store/comments";
import { useReactionStore } from "@store/reaction";
import {
  useContractConnectUpvote,
  useContractGetMessageById,
} from "../../services/contract-call";
import { useQuery } from "react-query";

const REACTION_IDS = ["/pepe.gif", "/snoop.gif", "/pulp.gif", "/minion.gif"];

export const Reactions = () => {
  const { top } = useCommentsStore((state) => state);

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ width: 1, p: 1, justifyContent: "flex-end" }}
    >
      {REACTION_IDS.map((url, index) => (
        <Reaction key={index.toString()} url={url} />
      ))}
    </Stack>
  );
};

export const Reaction = ({ url }: { url: string }) => {
  const topMessageId = "string";
  //const combinedId = hash({ url, topMessageId });
  const combinedId = "str";

  const { callUpvote } = useContractConnectUpvote();
  const { callGetMessageById } = useContractGetMessageById();

  const { data: count } = useQuery(
    "count",
    () => callGetMessageById(combinedId),
    { refetchInterval: 500 }
  );

  const { reaction, setReaction, removeReaction } = useReactionStore(
    (state) => state
  );
  const handler = () => {
    if (!reaction) {
      callUpvote(combinedId, 1);

      setReaction(url);
      setTimeout(() => {
        removeReaction();
      }, 3000);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      // onClick={onClick}
      sx={{
        p: 0.5,
        borderRadius: 50,
      }}
      onClick={handler}
    >
      <Stack direction="row" spacing={2} alignItems="center" pr={1}>
        <Box
          sx={{
            minWidth: 64,
            minHeight: 64,
            backgroundImage: `url('${url}')`,
            backgroundRepeat: "no-repeat",
            borderRadius: 50,
            backgroundSize: "cover",
          }}
        />
        <Typography variant="h5">{count || 0}</Typography>
      </Stack>
    </Button>
  );
};
