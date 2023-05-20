import { Button, FormControl, Slider, Stack, TextField } from "@mui/material";
import React, { FormEvent, FormEventHandler } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export const Form = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (event: SubmitHandler<FieldValues>): void => {
		// event.preventDefault();
		console.log("submit", event, {});
	};

	console.log(watch("example")); // watch input value by passing the name of it

	return (
		<></>
		// <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3} sx={{ border: 1, flexGrow: 1, maxHeight: 140, justifyContent: "center", alignItems: "center" }}>
		// 	<Stack direction="row">
		// 		<TextField name="message" id="standard-basic" label="Standard" variant="standard" />
		// 		<Button variant="contained" type="submit">
		// 			Send
		// 		</Button>
		// 	</Stack>
		// 	<Slider name="slider" defaultValue={1} step={1} marks min={0} valueLabelDisplay="auto" max={10} />
		// </Stack>
	);
};
