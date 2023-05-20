import { Button, Slider, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

type MessageContent = { message: string; special?: boolean; username: string };

export const postMessage = async ({ message, special }: { message: string; special: boolean }): Promise<boolean> => {
	const response = await axios.post("api/message", { message, special });
	return response.data;
};
export const Form = () => {
	const { mutate: post } = useMutation(postMessage);
	const formMethods = useForm<MessageContent>({ mode: "onChange" });
	const { register, handleSubmit } = formMethods;

	const onSubmit = ({ message }: MessageContent) => {
		const send = {
			message: message,
			special: false,
			username: "joe",
		};
		console.log({ send });
		post({ message: message, special: false });
	};

	return (
		<Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3} sx={{ flexGrow: 1, maxHeight: 140, justifyContent: "center", alignItems: "center", px: 2, pt: 1, pb: 2 }}>
			<Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
				<TextField {...register("message")} name="message" id="standard-basic" label="Write something" variant="standard" />
				<Button variant="contained" color="secondary" type="submit">
					Send
				</Button>
			</Stack>
			{/* {...register("amount")} */}
			<Slider color="secondary" name="amount" defaultValue={1} step={1} marks min={0} valueLabelDisplay="auto" max={10} />
		</Stack>
	);
};
