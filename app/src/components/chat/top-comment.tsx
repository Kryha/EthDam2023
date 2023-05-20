import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

export const TopComment = () => {
	return (
		<Stack
			direction="row"
			spacing={2}
			sx={{
				border: 1,
				borderColor: "secondary.main",
				borderRadius: 2,
				width: 1,
				justifyContent: "flex-start",
				alignItems: "center",
				p: 1,
			}}
		>
			<Avatar />
			<Stack>
				<Typography variant="body1" fontWeight="bold" color="secondary.main">
					username
				</Typography>
				<Typography variant="body1" color="secondary.main">
					comment
				</Typography>
			</Stack>
		</Stack>
	);
};
