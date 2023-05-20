import { createTheme } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { Comic_Neue } from "next/font/google";

const font = Comic_Neue({ weight: ["300", "400", "700"], style: ["italic", "normal"], subsets: ["latin"] });
const theme = createTheme({});

theme.palette = {
	...theme.palette,
	...palette(theme),
};

theme.components = {
	...theme.components,
	MuiTypography: {
		defaultProps: {
			fontFamily: font.style.fontFamily,
		},
	},
	MuiPaper: {
		styleOverrides: {
			root: {
				borderRadius: "32px",
			},
		},
	},
	MuiButton: {
		styleOverrides: {
			root: {
				borderRadius: "32px",
			},
		},
	},
	MuiInputBase: {
		styleOverrides: {
			root: {
				borderRadius: "32px !important",
			},
		},
	},
};

theme.typography = {
	...theme.typography,
	fontFamily: font.style.fontFamily,
	...typography(theme),
};
export default theme;
