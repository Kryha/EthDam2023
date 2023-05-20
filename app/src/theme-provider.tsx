import { ThemeProvider as Provider } from "@mui/material";
import { PropsWithChildren } from "react";
import theme from "./features/ui";

const ThemeProvider = ({ children }: PropsWithChildren) => {
	return <Provider theme={theme}>{children}</Provider>;
};

export default ThemeProvider;
