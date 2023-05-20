import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Stack, Tab, Tabs as MUITabs, Typography, TabProps } from "@mui/material";
import { useState } from "react";
import { Comments, TopComments } from "./comments";
import { useQuery } from "react-query";
import axios from "axios";
import { ApiGetMessage } from "../../pages/api/message";

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
		<Stack
			direction="column-reverse"
			component="div"
			sx={{ width: value === index ? 1 : 0, flexGrow: value === index ? 1 : 0, overflowY: "scroll", transition: "all 1s ease-in-out" }}
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
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

export const getComments = async (): Promise<ApiGetMessage> => {
	const response = await axios.get<ApiGetMessage>("api/message");
	return response.data;
};

export function BasicTabs() {
	const { data } = useQuery("comments", getComments, {
		refetchInterval: 250,
	});
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Stack sx={{ flexGrow: 1, position: "relative", overflow: "scroll", borderBottom: 1 }}>
			<Stack
				spacing={2}
				direction="row"
				sx={{
					flexGrow: 1,
					height: 1,
					maxHeight: 55,
					alignItems: "center",
					borderBottom: 1,
				}}
			>
				<ArrowForwardIosRounded color="secondary" />
				<MUITabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
					indicatorColor="secondary"
					TabIndicatorProps={{
						sx: {
							display: "none",
							borderRadius: 50,
							bottom: 0,
							my: "auto",
						},
					}}
				>
					<StyledTabs label={<Typography variant="button">Top</Typography>} {...a11yProps(0)} />
					<StyledTabs label={<Typography variant="button">All</Typography>} {...a11yProps(1)} />
				</MUITabs>
			</Stack>
			<TabPanel value={value} index={0}>
				<TopComments messages={data?.top || []} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Comments messages={data?.all || []} />
			</TabPanel>
		</Stack>
	);
}

export const StyledTabs = ({ children, ...rest }: TabProps) => {
	return (
		<Tab
			disableRipple
			sx={{
				zIndex: 1,
				border: 1,
				borderRadius: 50,
				borderColor: "secondary.main",
				mr: 1,
				p: 0,
				minHeight: "32px !important",
				my: "auto",
				"&.Mui-selected": {
					bgcolor: "secondary.main",
				},
			}}
			{...rest}
		/>
	);
};
