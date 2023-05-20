import { Box, Button, Stack, Typography } from "@mui/material";
import chihuahua from "../../../public/chi.gif";
import Image from "next/image";

export const Reactions = () => {
	const data = Array.from({ length: 4 }, () => "comment");
	return (
		<Stack spacing={2} direction="row" sx={{ width: 1, p: 1, justifyContent: "flex-end" }}>
			{data.map((_, index) => (
				<Reaction key={index.toString()} />
			))}
		</Stack>
	);
};

export const Reaction = () => {
	return (
		<Button variant="contained" color="secondary" sx={{ p: 0.5, borderRadius: 50 }}>
			<Stack direction="row" spacing={2} alignItems="center" pr={1}>
				<Box sx={{ minWidth: 64, minHeight: 64, backgroundImage: "url('/chi.gif')", backgroundRepeat: "no-repeat", borderRadius: 50, backgroundSize: "cover" }} />
				<Typography variant="h5">12</Typography>
			</Stack>
		</Button>
	);
};
