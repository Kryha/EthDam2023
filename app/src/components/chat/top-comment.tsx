import { North, South } from "@mui/icons-material";
import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";

export const TopComment = (props: {
  key: string;
  username: string;
  message: string;
}) => {
  const { key, username, message } = props;

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
        <IconButton size="small" sx={{ bgcolor: "primary.main" }}>
          <South fontSize="small" color="secondary" />
        </IconButton>
      </Stack>
    </Stack>
  );
};
