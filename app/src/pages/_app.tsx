import "@/styles/globals.css";
import ThemeProvider from "@/theme-provider";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
