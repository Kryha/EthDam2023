import { Stack } from "@mui/material";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<Stack
				component="body"
				sx={{
					position: "relative",
					backgroundColor: "black",
					backgroundImage: "linear-gradient(270deg,#39b10f,#9ec61a)",
					// backgroundImage: "linear-gradient(270deg,#3CC00D,#ACD71B)",
					// background: "linear-gradient(45deg,#a2da89,#6bb94e)",
					perspective: "170px",
					// overflow: "hidden",
					"&::before": {
						content: "''",
						position: "absolute",
						inset: "-40vh -20vw 0 -40vw",
						backgroundColor: "transparent",
						// backgroundImage: "linear-gradient(#bde5ab 1px, transparent 1px), linear-gradient(to right, #bde5ab 1px, transparent 1px)",
						backgroundImage: "linear-gradient(#a9ea5080 1px, transparent 1px), linear-gradient(to right, #a9ea5080 1px, transparent 1px)",
						backgroundSize: "120px 120px",
						transform: "rotateX(-350deg)",
					},
				}}
			>
				<Main />
				<NextScript />
			</Stack>
		</Html>
	);
}
