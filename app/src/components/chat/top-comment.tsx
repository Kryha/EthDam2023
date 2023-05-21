import { North, South } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Paper,
  Stack,
  StackProps,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import {
  useContractConnectDownvote,
  useContractConnectUpvote,
  useContractGetMessageById,
} from "../../services/contract-call";

interface Props extends StackProps {
  key: string;
  username: string;
  message: string;
  messageId: string;
  count?: number;
}
export const TopComment = (props: Props) => {
  const { key, username, message, count: _count, messageId, ...rest } = props;

  const [count, setCount] = useState(_count);

  const { callGetMessageById } = useContractGetMessageById();

  useMemo(async () => {
    if (_count === undefined) {
      setCount(await callGetMessageById(messageId));
    }
  }, [messageId, _count]);

  const { callUpvote } = useContractConnectUpvote();
  const { callDownvote } = useContractConnectDownvote();

  return (
    <Stack
      key={key}
      component={Paper}
      sx={{
        borderRadius: 2,
        width: 1,
        overflow: "hidden",
        ...rest.sx,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ p: 1 }}>
        <Avatar
          src={`https://api.dicebear.com/6.x/open-peeps/svg?seed=${username}`}
        />
        <Stack>
          <Typography variant="body1" fontWeight="bold" color="secondary">
            {username}
          </Typography>
          <Typography variant="body1" color="secondary">
            {message}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={1}
        px={1}
        sx={{
          // p: 0.2,
          bgcolor: "primary.main",
          background:
            "linear-gradient(70deg, #67CFEB, #A9EA50, #CA38EB,#67CFEB, #A9EA50)",
          backgroundSize: "200% 100%",
          animation: "gradient 5s ease alternate-reverse infinite",
        }}
      >
        <Typography variant="h6" color="primary">
          {count}
        </Typography>
        <Stack direction="row" spacing={2}>
          <IconButton
            size="small"
            sx={{ bgcolor: "primary.main" }}
            onClick={() => callUpvote(messageId, 1)}
          >
            <North fontSize="small" color="secondary" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ bgcolor: "primary.main" }}
            onClick={() => callDownvote(messageId, 1)}
          >
            <South fontSize="small" color="secondary" />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
