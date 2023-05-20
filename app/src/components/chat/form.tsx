import { Button, Slider, Stack, TextField, Typography } from "@mui/material";
import { useContractConnectPost, useContractConnectUpvote } from "@services/contract-call";
import axios from "axios";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

type MessageContent = { amount: number; message: string; username: string };

export const postMessage = async ({ message, special }: { message: string; special: boolean }): Promise<string> => {
	const response = await axios.post("api/message", { message, special });
	return response.data.messageId;
};

export const Form = () => {
	const { data: messageId, mutate: post } = useMutation(postMessage);
	const formMethods = useForm<MessageContent>({ mode: "onChange" });
	const { register, handleSubmit, watch } = formMethods;
	const [slider, setSlider] = useState<number | number[]>(0);

	const { callPostMessage } = useContractConnectPost();
	const { callUpvote } = useContractConnectUpvote();

	const onSubmit = async ({ message, amount }: MessageContent) => {
		post({ message: message, special: amount > 0 });
	};

	useMemo(async () => {
		if (messageId) {
			console.log(messageId);
			await callPostMessage("", messageId);
			await callUpvote(messageId);
		}
	}, [messageId]);

	return (
		<Stack
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			spacing={3}
			sx={{
				flexGrow: 1,
				maxHeight: 140,
				justifyContent: "center",
				alignItems: "center",
				px: 2,
				py: 1,
				borderTop: 1,
			}}
		>
			<Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
				<TextField {...register("message")} name="message" id="standard-basic" label="Write something" variant="standard" />
				<Button variant="contained" color="secondary" type="submit">
					Send
				</Button>
			</Stack>
			<Stack direction="row" sx={{ width: 1 }} spacing={4}>
				<Slider {...register("amount")} value={slider} onChange={(_, value) => setSlider(value)} color="secondary" name="amount" defaultValue={1} step={1} marks min={0} valueLabelDisplay="auto" max={10} />
				<Typography variant="h5" color="secondary">
					{slider}
				</Typography>
			</Stack>
		</Stack>
	);
};
