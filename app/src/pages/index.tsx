import { Paper, Stack, TextField } from "@mui/material";
import Head from "next/head";
import screen from "../../public/screen.gif";
import Image from "next/image";
import { Chat } from "@/components";
import { Wallet } from "@/features/wallet/wallet";

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Stack component="main" sx={{ maxHeight: "100vh" }}>
				<Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: 80 }}>
					<TextField id="outlined-basic" label="Search" variant="outlined" sx={{ width: 1, maxWidth: 400 }} />
					<Wallet />
				</Stack>
				<Stack spacing={1} mx={1} component="section" role="livestream" direction="row" sx={{ maxHeight: "calc(100vh - 80px)", justifyContent: "center" }}>
					<Stack justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
						<Stack
							component={Paper}
							role="screen"
							sx={{
								position: "relative",
								width: 1,
								aspectRatio: 3 / 2,
								objectFit: "cover",
								overflow: "hidden",
								alignItems: "center",
							}}
						>
							<Image
								src={screen}
								layout="responsive"
								// @ts-ignore
								width="100%"
								// @ts-ignore
								height="62.5%" // 16:10 aspect ratio
								objectFit="cover"
							/>
						</Stack>
					</Stack>

					<Chat />
				</Stack>
			</Stack>
		</>
	);
}
