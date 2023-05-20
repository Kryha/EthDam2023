import { Avatar, Paper, Stack, Typography } from "@mui/material";
import { TopComment } from "./top-comment";
import { Comment } from "./comment";
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
