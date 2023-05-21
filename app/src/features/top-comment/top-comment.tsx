import { North } from "@mui/icons-material";
import { Paper, Slide, Stack, Typography } from "@mui/material";
import { useCommentsStore } from "@store/comments";
import React from "react";

export const TopComment = () => {
	const { top } = useCommentsStore((state) => state);

	return (
		<Slide in={Boolean(top?.id)} direction="up" mountOnEnter unmountOnExit timeout={{ appear: 12000, enter: 12000, exit: 12000 }}>
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
					bgcolor: "primary.main",
					background: "linear-gradient(70deg, #67CFEB, #A9EA50, #CA38EB,#67CFEB, #A9EA50)",
					backgroundSize: "400% 100%",
					animation: "gradient 5s ease alternate-reverse infinite",
				}}
			>
				<Typography variant="h3" color="primary.dark">
					{top?.content.message}
				</Typography>
				<Typography variant="h3" color="primary.dark">
					{top?.count}
					<North />
				</Typography>
			</Stack>
		</Slide>
	);
};
