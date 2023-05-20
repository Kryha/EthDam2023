import { Button, Slider, Stack, TextField } from "@mui/material";
import React from "react";

export const Form = () => {
	return (
		<Stack spacing={3} sx={{ border: 1, flexGrow: 1, maxHeight: 140, justifyContent: "center", alignItems: "center" }}>
			<Stack direction="row">
				<TextField id="standard-basic" label="Standard" variant="standard" />
				<Button variant="contained">Send</Button>
			</Stack>
			<Slider defaultValue={1} step={1} marks min={0} valueLabelDisplay="auto" max={10} />
		</Stack>
	);
};
