import { Avatar, Paper, Stack, Typography } from "@mui/material";

export const Comment = (props: {
  key: string;
  username: string;
  message: string;
}) => {
  const { key, username, message } = props;

  return (
    <Stack
      component={Paper}
      direction="row"
      spacing={2}
      key={key}
      sx={{
        // border: 1,
        // borderColor: "secondary.main",
        borderRadius: 2,
        width: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        p: 1,
      }}
    >
      <Avatar />
      <Stack>
        <Typography variant="body1" fontWeight="bold" color="secondary.main">
          {username}
        </Typography>
        <Typography variant="body1" color="secondary.main">
          {message}
        </Typography>
      </Stack>
    </Stack>
  );
};
