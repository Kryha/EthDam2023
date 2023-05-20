import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";

export const Tabs = () => {
	return (
		<Stack spacing={2} direction="row" sx={{ border: 1, flexGrow: 1, maxHeight: 55, alignItems: "center" }}>
			<ArrowBackIosNewRounded />
			<Chip label="Top" />
			<Chip label="All" variant="outlined" />
		</Stack>
	);
};
