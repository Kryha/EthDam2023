import { Button, Slider, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type MessageContent = { message: string; special?: boolean; username: string };

export const Form = () => {
	const formMethods = useForm<MessageContent>({ mode: "onChange" });
	const { register, handleSubmit } = formMethods;

	const onSubmit = ({ message }: MessageContent) => {
		const send = {
			message: message,
			special: false,
			username: "joe",
		};
		console.log({ send });
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
