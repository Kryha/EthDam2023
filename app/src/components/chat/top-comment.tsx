import { North, South } from "@mui/icons-material";
import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";
import { getVoteCountByMessageId } from "@services/get-vote-count";
import React, { useContext, useEffect, useMemo, useState } from "react";

export const TopComment = (props: {
  key: string;
  username: string;
  message: string;
  messageId: string;
  count?: number;
}) => {
  const { key, username, message, count: _count, messageId } = props;

  const [count, setCount] = useState(_count);

  useMemo(async () => {
    if (_count === undefined) {
      setCount(await getVoteCountByMessageId(messageId));
    }
  }, [messageId, _count]);

  if (!count) {
    getVoteCountByMessageId(messageId);
  }

  return (
    <Stack
      key={key}
      component={Paper}
      sx={{
        borderRadius: 2,
        width: 1,
        overflow: "hidden",
      }}
    >
      <Stack direction="row" spacing={2} sx={{ p: 1 }}>
        <Avatar />
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
        justifyContent="flex-end"
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
        <IconButton size="small" sx={{ bgcolor: "primary.main" }}>
          <North fontSize="small" color="secondary" />
        </IconButton>
        <Typography variant="body1" color="secondary">
          {count}
        </Typography>
        <IconButton size="small" sx={{ bgcolor: "primary.main" }}>
          <South fontSize="small" color="secondary" />
        </IconButton>
      </Stack>
    </Stack>
  );
};
