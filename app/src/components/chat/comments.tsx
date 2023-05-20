import { Stack } from "@mui/material";
import { TopComment } from "./top-comment";
import { Comment } from "./comment";
import axios from "axios";
import { useQuery } from "react-query";
import { Message } from "@blockbusters/ssb-types";
import { getVoteCountByMessageId } from "@services/get-vote-count";
import { useMemo, useState } from "react";

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
					const el = <TopComment key={index.toString()} username={msg.content.username} message={msg.content.message} messageId={msg.id} />;

					array.push(el);
					return array;
				}

				const el = <Comment key={index.toString()} username={msg.content.username} message={msg.content.message} />;

				array.push(el);
				return array;
			}, [])}
		</Stack>
	);
};

type ExtendedMessage = Message & { count: number };

export const TopComments = (props: { messages: Message[] }) => {
	const { messages } = props;
	// console.log({ messages });
	const [sortedMessages, setSortedMessages] = useState<ExtendedMessage[]>([]);

	useMemo(async () => {
		// Adds count
		const extendedMessages: ExtendedMessage[] = await Promise.all(
			messages.map(async (message) => {
				const count = await getVoteCountByMessageId(message.id);
				return { ...message, count };
			})
		);
		// Sorts comments
		const sortedMessages = extendedMessages.sort((a, b) => {
			return b.count - a.count;
		});

		setSortedMessages(sortedMessages);
	}, [messages]);

	return (
		<Stack spacing={2} my={2}>
			{sortedMessages.reduceRight<JSX.Element[]>((array, msg, index) => {
				const el = <TopComment key={index.toString()} username={msg.content.username} message={msg.content.message} messageId={msg.id} count={msg.count} sx={{ order: msg.count }} />;
				array.push(el);
				return array;
			}, [])}
		</Stack>
	);
};
