import { Stack, Zoom } from "@mui/material";
import { useReactionStore } from "@store/reaction";
import React from "react";

export const Explosions = () => {
	const { reaction } = useReactionStore((state) => state);

	return (
		<Zoom
			in={Boolean(reaction)}
			// easing={{
			// 	enter: "cubic-bezier(.02,1.79,.22,1.09)",
			// 	exit: "ease",
			// }}
			timeout={{ appear: 1200, enter: 1200, exit: 0 }}
		>
			<Stack sx={{ position: "absolute", inset: 0 }}>
				<Stack
					spacing={2}
					direction="row"
					sx={{
						transform: "unset",
						// width: 1,
						// height: 1,
						position: "absolute",
						transition: "all 0.3s ease",
						inset: 0,
						backgroundColor: "transparent",
						backgroundImage: "url('/confetti.gif')",
						filter: "hue-rotate(240deg)",
						// backgroundImage: "url('/explosion.png')",
						backgroundSize: "100%",
						// backgroundSize: "110% 200%",
						// backgroundPositionY: "200%",
						// animation: "move 4s infinite",
						zIndex: 0,
					}}
				></Stack>
				<Stack
					spacing={2}
					direction="row"
					sx={{
						zIndex: 10,
						position: "absolute",
						width: 1,
						height: 1,
						// borderRadius: 100,
						// transition: "all 0.3s ease",
						inset: 0,
						transform: "scale(0.8)",
						backgroundColor: "transparent",
						backgroundImage: `url('${reaction}')`,
						backgroundSize: "contain",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						clipPath: "circle(32%)",
					}}
				/>
			</Stack>
		</Zoom>
	);
};
