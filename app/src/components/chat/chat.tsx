import { Paper, Stack } from "@mui/material";
import { Tabs } from "./tabs";
import { Form } from "./form";

export const Chat = () => {
	return (
		<Stack component={Paper} role="chat" sx={{ border: 1, width: 1, maxWidth: 450 }}>
			<Tabs />
			<Form />
		</Stack>
	);
};
