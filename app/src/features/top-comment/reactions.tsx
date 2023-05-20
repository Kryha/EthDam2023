import { Box, Button, Fade, Stack, Tooltip, Typography, Zoom } from "@mui/material";

export const Reactions = () => {
	const data = Array.from({ length: 4 }, () => "comment");
	return (
		<Stack spacing={2} direction="row" sx={{ width: 1, p: 1, justifyContent: "flex-end" }}>
			{data.map((_, index) => (
				<Reaction key={index.toString()} />
			))}
		</Stack>
	);
};

export const Reaction = () => {
	return (
		<Tooltip
			TransitionComponent={Zoom}
			TransitionProps={{ easing: { enter: "cubic-bezier(.02,1.79,.31,.89)", exit: "cubic-bezier(.2,1.79,.28,.77)" }, timeout: { enter: 600, exit: 300 } }}
			placement="top"
			sx={{ background: "transparent" }}
			title={
				<Box
					sx={{
						transform: "translateX(-60%)",
						minWidth: "30rem",
						minHeight: "30rem",
						backgroundImage: "url('/chi.gif')",
						backgroundRepeat: "no-repeat",
						borderRadius: 50,
						backgroundSize: "cover",
					}}
				/>
			}
		>
			<Button
				variant="contained"
				color="secondary"
				// onClick={onClick}
				sx={{
					p: 0.5,
					borderRadius: 50,
				}}
			>
				<Stack direction="row" spacing={2} alignItems="center" pr={1}>
					<Box sx={{ minWidth: 64, minHeight: 64, backgroundImage: "url('/chi.gif')", backgroundRepeat: "no-repeat", borderRadius: 50, backgroundSize: "cover" }} />
					<Typography variant="h5">12</Typography>
				</Stack>
			</Button>
		</Tooltip>
	);
};
