import { Palette, Theme } from "@mui/material";

export const palette = (theme: Theme): Palette => {
	return {
		...theme.palette,
		mode: "dark",
		common: {
			white: "#e0e0e1",
			black: "#151515",
		},
		primary: { light: "#434343", main: "#151515", dark: "#0e0e0e", contrastText: "#e2e2e2" },
		text: {
			primary: "#494a52",
			secondary: "#f1f1f2",
			disabled: "#9799a6",
		},
		background: {
			paper: "#151515",
			default: "#151515",
		},
		divider: "#151515",
	};
};
