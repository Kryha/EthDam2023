import { Stack, Zoom } from "@mui/material";
import { useReactionStore } from "@store/reaction";
import React from "react";

export const Explosions = () => {
	const { reaction } = useReactionStore((state) => state);

	return (
		<Zoom in={Boolean(true)} easing={{ enter: "cubic-bezier(.02,1.79,.31,.89)", exit: "ease" }} timeout={{ appear: 1200, enter: 1200, exit: 0 }}>
			{/* <Stack sx={{ position: "relative", flexGrow: 1, width: 1, height: 1 }}> */}
			<Stack
				spacing={2}
				direction="row"
				sx={{
					// transform: reaction ? "scale(30)" : "1",
					// width: 1,
					// height: 1,
					position: "absolute",
					transition: "all 0.3s ease",
					inset: 0,
					backgroundColor: "transparent",
					backgroundImage: "url('/confetti.gif')",
					backgroundSize: "100% 200%",
					backgroundPosition: "0%",
					animation: "move 10s infinite",
					zIndex: 0,
				}}
			>
				<Stack
					spacing={2}
					direction="row"
					sx={{
						zIndex: 10,
						position: "absolute",
						width: 1,
						height: 1,
						// borderRadius: 100,
						transition: "all 0.3s ease",
						inset: 0,
						transform: "scale(0.8)",
						backgroundColor: "transparent",
						backgroundImage: "url('/chi.gif')",
						backgroundSize: "cover",
						clipPath: "circle(32%)",
					}}
				/>
			</Stack>
			{/* </Stack> */}
		</Zoom>
	);
};
