import { Paper, Stack, Typography } from "@mui/material";

export const Comments = () => {
	const data = Array.from({ length: 25 }, () => "comment");
	return (
		<Stack sx={{ border: 1, flexGrow: 1, justifyContent: "flex-end", alignItems: "center", overflow: "scroll" }}>
			{data.map(() => (
				<Stack component={Paper} sx={{ border: 1, width: 1, justifyContent: "center", alignItems: "center", bgcolor: "pink" }}>
					<Typography variant="body1" fontWeight="bold">
						username
					</Typography>
					<Typography variant="body1">comment</Typography>
				</Stack>
			))}
		</Stack>
	);
};
