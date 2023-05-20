import { Paper, Stack, Typography } from "@mui/material";

export const Comments = () => {
	const data = Array.from({ length: 25 }, () => "comment");
	return (
		<Stack>
			{data.map((_, index) => (
				<Stack key={index.toString()} component={Paper} sx={{ border: 1, width: 1, justifyContent: "center", alignItems: "center", bgcolor: "green" }}>
					<Typography variant="body1" fontWeight="bold">
						username
					</Typography>
					<Typography variant="body1">comment</Typography>
				</Stack>
			))}
		</Stack>
	);
};
