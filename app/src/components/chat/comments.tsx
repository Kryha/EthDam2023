import { Avatar, Paper, Stack, Typography } from "@mui/material";
import { TopComment } from "./top-comment";
import axios from "axios";
import { useQuery } from "react-query";
import { Message } from "@blockbusters/ssb-types";

export const getMemes = async (): Promise<boolean> => {
  const response = await axios.get("route");
  return response.data;
};

export const Comments = (props: { messages: Message[] }) => {
  const { messages } = props;

  const {} = useQuery(["avatars", getMemes]);
  return (
    <Stack spacing={2} my={2}>
      {messages.reduceRight<JSX.Element[]>((array, msg, index) => {
        if (msg.content.special) {
          const el = (
            <TopComment
              key={index.toString()}
              username={msg.content.username}
              message={msg.content.message}
            />
          );

          array.push(el);
          return array;
        }

        const el = (
          <Comment
            key={index.toString()}
            username={msg.content.username}
            message={msg.content.message}
          />
        );

        array.push(el);
        return array;
      }, [])}
    </Stack>
  );
};

const Comment = (props: { key: string; username: string; message: string }) => {
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

export const TopComments = (props: { messages: Message[] }) => {
  const { messages } = props;

  return (
    <Stack spacing={2} my={2}>
      {messages.reduceRight<JSX.Element[]>((array, msg, index) => {
        const el = (
          <TopComment
            key={index.toString()}
            username={msg.content.username}
            message={msg.content.message}
          />
        );
        array.push(el);
        return array;
      }, [])}
    </Stack>
  );
};
