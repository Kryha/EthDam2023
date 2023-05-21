import { North } from "@mui/icons-material";
import { Paper, Slide, Stack, Typography } from "@mui/material";
import { useCommentsStore } from "@store/comments";
import React from "react";

export const TopComment = () => {
	const { top } = useCommentsStore((state) => state);

	return (
		<Slide in={Boolean(top)} direction="up" mountOnEnter unmountOnExit>
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
					zIndex: 100,
				}}
			>
				<Typography variant="h4" color="secondary">
					{top?.content.message}
				</Typography>
				<Typography variant="h4" color="secondary">
					{top?.count}
					<North />
				</Typography>
			</Stack>
		</Slide>
	);
};
