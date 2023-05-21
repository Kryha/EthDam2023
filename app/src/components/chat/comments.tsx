import { Stack } from "@mui/material";
import { TopComment } from "./top-comment";
import { Comment } from "./comment";
import axios from "axios";
import { useQuery } from "react-query";
import { Message } from "@blockbusters/ssb-types";
import { useContractGetMessageById } from "@/services";
import { useMemo, useState } from "react";
import { useCommentsStore } from "@store/comments";

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
					const el = <TopComment key={index.toString()} comment={{ ...msg, count: 0 }} />;

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

export type ExtendedMessage = Message & { count: number };

export const TopComments = (props: { messages: Message[] }) => {
	const { messages } = props;
	const { callGetMessageById } = useContractGetMessageById();
	const { top, setTop, removeTop } = useCommentsStore((state) => state);
	const [sortedMessages, setSortedMessages] = useState<ExtendedMessage[]>([]);

	useMemo(async () => {
		// Adds count
		const extendedMessages: ExtendedMessage[] = await Promise.all(
			messages.map(async (message) => {
				const count = (await callGetMessageById(message.id)) || 0;
				return { ...message, count };
			})
		);
		// Sorts comments
		const sortedMessages = extendedMessages.sort((a, b) => {
			return b.count - a.count;
		});

		setSortedMessages(sortedMessages);
		if (top?.id !== sortedMessages[0]?.id) {
			removeTop();
			setTop(sortedMessages[0]);
		} else {
			setTop(sortedMessages[0]);
		}
	}, [messages]);

	return (
		<Stack spacing={2} my={2}>
			{sortedMessages.reduceRight<JSX.Element[]>((array, msg, index) => {
				const el = <TopComment key={index.toString()} comment={msg} sx={{ order: msg.count }} />;
				array.push(el);

				return array;
			}, [])}
		</Stack>
	);
};
