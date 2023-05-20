import { Paper, Stack } from "@mui/material";
import { Tabs } from "./tabs";
import { Form } from "./form";
import { Comments } from "./comments";

export const Chat = () => {
	return (
		<Stack component={Paper} role="chat" sx={{ border: 1, width: 450 }}>
			<Tabs />
			<Comments />
			<Form />
		</Stack>
	);
};
