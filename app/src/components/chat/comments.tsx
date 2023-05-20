import { Avatar, Paper, Stack, Typography } from "@mui/material";
import { TopComment } from "./top-comment";

export const Comments = () => {
	const data = Array.from({ length: 25 }, () => "comment");
	return (
		<Stack component={Paper} spacing={2} my={2}>
			{data.map((_, index) => (
				<Stack
					direction="row"
					spacing={2}
					key={index.toString()}
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
			))}
		</Stack>
	);
};

export const TopComments = () => {
	const data = Array.from({ length: 25 }, () => "comment");
	return (
		<Stack component={Paper} spacing={2} my={2}>
			{data.map((_, index) => (
				<TopComment />
			))}
		</Stack>
	);
};
