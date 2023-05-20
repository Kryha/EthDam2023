import { North, South } from "@mui/icons-material";
import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";

export const TopComment = () => {
	return (
		<Stack
			component={Paper}
			sx={{
				borderRadius: 2,
				width: 1,
				overflow: "hidden",
			}}
		>
			<Stack direction="row" spacing={2} sx={{ p: 1 }}>
				<Avatar />
				<Stack>
					<Typography variant="body1" fontWeight="bold" color="secondary">
						username
					</Typography>
					<Typography variant="body1" color="secondary">
						What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in
						gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking
					</Typography>
				</Stack>
			</Stack>

			<Stack
				direction="row"
				justifyContent="flex-end"
				spacing={1}
				px={1}
				sx={{
					// p: 0.2,
					bgcolor: "primary.main",
					background: "linear-gradient(70deg, #67CFEB, #A9EA50, #CA38EB,#67CFEB, #A9EA50)",
					backgroundSize: "200% 100%",
					animation: "gradient 5s ease alternate-reverse infinite",
				}}
			>
				<IconButton size="small" sx={{ bgcolor: "primary.main" }}>
					<North fontSize="small" color="secondary" />
				</IconButton>
				<IconButton size="small" sx={{ bgcolor: "primary.main" }}>
					<South fontSize="small" color="secondary" />
				</IconButton>
			</Stack>
		</Stack>
	);
};
