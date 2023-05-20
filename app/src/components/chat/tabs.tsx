import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Box, Chip, Stack, Tab, Tabs as MUITabs, Typography, Paper } from "@mui/material";
import { useState } from "react";
import { Comments } from "./comments";

export const Tabs = () => {
	return <BasicTabs />;
};

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<Stack component="div" sx={{ flexGrow: 1, overflowY: "scroll" }} role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && children}
		</Stack>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export function BasicTabs() {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Stack sx={{ flexGrow: 1, position: "relative", overflow: "scroll" }}>
			<Stack
				spacing={2}
				direction="row"
				sx={{
					bottom: 1,
					flexGrow: 1,
					height: 1,
					maxHeight: 55,
					alignItems: "center",
					borderBottom: 1,
					borderColor: "divider",
				}}
			>
				<ArrowBackIosNewRounded />
				<MUITabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ sx: { display: "none" } }}>
					<Tab label={<Typography variant="button">Top</Typography>} {...a11yProps(0)} sx={{ borderRadius: 50 }} />
					<Tab label={<Typography variant="button">All</Typography>} {...a11yProps(1)} sx={{ borderRadius: 50 }} />
				</MUITabs>
			</Stack>
			<TabPanel value={value} index={0}>
				<Comments />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Comments />
			</TabPanel>
		</Stack>
	);
}
