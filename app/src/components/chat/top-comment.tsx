import { North } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

export const TopComment = () => {
	return (
		<Stack
			sx={{
				borderRadius: 2,
				width: 1,
				// justifyContent: "flex-start",
				// alignItems: "center",
				p: 0.1,
				background: "linear-gradient(70deg, #67CFEB, #A9EA50, #CA38EB,#67CFEB, #A9EA50)",
				backgroundSize: "200% 100%",
				animation: "gradient 5s ease alternate-reverse infinite",
				// height: "100vh",
			}}
		>
			<Stack direction="row" spacing={2}>
				<Avatar />
				<Stack>
					<Typography variant="body1" fontWeight="bold">
						username
					</Typography>
					<Typography variant="body1">comment</Typography>
				</Stack>
			</Stack>

			<Stack direction="row" sx={{ bgcolor: "primary.main", borderRadius: 2 }}>
				<North />
			</Stack>
		</Stack>
	);
};
