import { Theme } from "@mui/material";
import { Comic_Neue } from "next/font/google";

const font = Comic_Neue({ weight: ["300", "400", "700"], style: ["italic", "normal"], subsets: ["latin"] });

export const typography = ({ palette }: Theme) => {
	return {
		subtitle1: {
			fontFamily: font.style.fontFamily,
		},
		body1: {
			fontFamily: font.style.fontFamily,
		},
		button: {
			fontFamily: font.style.fontFamily,
		},
	};
};
