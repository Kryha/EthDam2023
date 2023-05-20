import { Paper, Stack } from "@mui/material";
import { Tabs } from "./tabs";
import { Form } from "./form";
import { FC } from "react";

export const Chat: FC = () => {
	return (
		<Stack component={Paper} role="chat" sx={{ width: 1, maxWidth: 450, px: 1, bgcolor: "#1B1B1B" }}>
			<Tabs />
			<Form />
		</Stack>
	);
};
