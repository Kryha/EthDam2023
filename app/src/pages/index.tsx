import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import screen from "../../public/screen.gif";
import Image from "next/image";
import { Chat } from "@/components";
import { Wallet } from "@/features/wallet/wallet";
import { Reactions, TopComment } from "@features/top-comment";
import { Explosions } from "@features/top-comment/explosion";
import { ChevronLeft, Search } from "@mui/icons-material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gozzips</title>
        <meta
          name="description"
          content="Fully decentralized chat system with voting mechanism"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack component="main" sx={{ maxHeight: "100vh" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: 80, mx: 1 }}
        >
          <IconButton sx={{ bgcolor: "#272727" }}>
            <ChevronLeft color="secondary" />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ bgcolor: "#272727", borderRadius: 50, px: 2 }}
          >
            <Typography
              variant="button"
              color="secondary"
              sx={{ minWidth: 270 }}
            >
              Search
            </Typography>
            <IconButton onClick={() => {}} onMouseDown={() => {}} edge="end">
              <Search color="secondary" />
            </IconButton>
          </Stack>
          <Wallet />
        </Stack>
        <Stack
          spacing={1}
          m={1}
          component="section"
          role="livestream"
          direction="row"
          sx={{
            maxHeight: "calc(100vh - 80px)",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <Stack
              component={Paper}
              role="screen"
              sx={{
                position: "relative",
                width: 1,
                aspectRatio: 3 / 2,
                alignItems: "center",
                justifyContent: "space-around",
                p: 1,
              }}
            >
              <Stack
                component={Paper}
                role="screen"
                sx={{
                  position: "relative",
                  width: 1,
                  objectFit: "cover",
                  overflow: "hidden",
                  alignItems: "center",
                }}
              >
                <TopComment />
                <Explosions />
                {/* <Image
									src={screen}
									layout="responsive"
									// @ts-ignore
									width="100%"
									// @ts-ignore
									height="62.5%" // 16:10 aspect ratio
									objectFit="cover"
								/> */}
                <Stack
                  sx={{
                    width: "100%",
                    pt: "56.25%",
                    position: "relative",
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ position: "absolute", inset: "0" }}
                    src="https://www.youtube.com/embed/iI8BQh9Ic-E?autoplay=1&mute=1&enablejsapi=1&controls=0"
                    title="Livestream"
                    // frameborder="0"
                    allow="autoplay"
                    allowFullScreen
                  />
                </Stack>
              </Stack>
              <Reactions />
            </Stack>
          </Stack>
          <Chat />
        </Stack>
      </Stack>
    </>
  );
}
