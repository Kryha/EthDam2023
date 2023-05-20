import { North } from "@mui/icons-material";
import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

export const TopComment = () => {
	return (
		<Stack
			component={Paper}
			spacing={2}
			direction="row"
			sx={{
				position: "absolute",
				left: 0,
				bottom: "5%",
				p: 2,
				borderTopLeftRadius: 0,
				borderBottomLeftRadius: 0,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Typography variant="h4" color="secondary">
				Top comment
			</Typography>
			<Typography variant="h4" color="secondary">
				134
				<North />
			</Typography>
		</Stack>
	);
};
