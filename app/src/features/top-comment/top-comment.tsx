import { North } from "@mui/icons-material";
import { Paper, Slide, Stack, Typography, Zoom } from "@mui/material";
import { useCommentsStore } from "@store/comments";
import React, { useEffect, useState } from "react";

export const TopComment = () => {
	const { top } = useCommentsStore((state) => state);
	const [prev, setPrev] = useState(top);
	const [changed, setChanged] = useState(Boolean(top));
	useEffect(() => {
		if (prev !== top) {
			setPrev(undefined);
			setChanged(true);
			setTimeout(() => {
				setPrev(top);
			}, 1200);
			setTimeout(() => {
				setChanged(false);
			}, 1200);
		}
	}, [top]);

	return (
		<Slide in={Boolean(prev)} direction="up" mountOnEnter unmountOnExit timeout={{ appear: 600, enter: 1200 }}>
			<Stack
				component={Paper}
				spacing={2}
				direction="row"
				sx={{
					position: "absolute",
					left: changed ? "50%" : 0,
					transform: changed ? "scale(1.9)" : "scale(1)",
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
