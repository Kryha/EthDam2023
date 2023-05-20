import { Button, Slider, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type MessageContent = { message: string; special?: boolean; username: string };
// const ssb = require("@blockbusters/ssb-core");
// const { connect } = require("@blockbusters/ssb-frontend");

export const Form = () => {
	const formMethods = useForm<MessageContent>({ mode: "onChange" });
	const { register, handleSubmit } = formMethods;
	// const connection = connect();

	// ssb.setConnection(connection);

	const onSubmit = ({ message }: MessageContent) => {
		// ssb.postMessage({
		// 	message: message,
		// 	username: "joe",
		// });

		const send = {
			message: message,
			special: false,
			username: "joe",
		};
		console.log({ send });
	};

	return (
		<Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3} sx={{ border: 1, flexGrow: 1, maxHeight: 140, justifyContent: "center", alignItems: "center" }}>
			<Stack direction="row">
				<TextField {...register("message")} name="message" id="standard-basic" label="Standard" variant="standard" />
				<Button variant="contained" type="submit">
					Send
				</Button>
			</Stack>
			{/* <Slider {...register("amount")} name="amount" defaultValue={1} step={1} marks min={0} valueLabelDisplay="auto" max={10} /> */}
		</Stack>
	);
};
