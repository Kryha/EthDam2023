import { Box, Button, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import { useCommentsStore } from "@store/comments";
import { useReactionStore } from "@store/reaction";
import hash from "object-hash";
import { useContractConnectUpvote } from "../../services/contract-call";

const REACTION_IDS = ["/pepe.gif", "/chi.gif", "/chi.gif", "/chi.gif"];

export const Reactions = () => {
	const { top } = useCommentsStore((state) => state);

	return (
		<Stack spacing={2} direction="row" sx={{ width: 1, p: 1, justifyContent: "flex-end" }}>
			{REACTION_IDS.map((url, index) => (
				<Reaction key={index.toString()} url={url} />
			))}
		</Stack>
	);
};

export const Reaction = ({ url }: { url: string }) => {
	const topMessageId = "string";
	const combinedId = hash({ url, topMessageId });

	const { callUpvote } = useContractConnectUpvote();

	const { reaction, setReaction, removeReaction } = useReactionStore((state) => state);
	const handler = () => {
		if (!reaction) {
			callUpvote(combinedId, 1);

			setReaction(url);
			setTimeout(() => {
				removeReaction();
			}, 3000);
		}
	};

	return (
		<Button
			variant="contained"
			color="secondary"
			// onClick={onClick}
			sx={{
				p: 0.5,
				borderRadius: 50,
			}}
			onClick={handler}
		>
			<Stack direction="row" spacing={2} alignItems="center" pr={1}>
				<Box
					sx={{
						minWidth: 64,
						minHeight: 64,
						backgroundImage: `url('${url}')`,
						backgroundRepeat: "no-repeat",
						borderRadius: 50,
						backgroundSize: "cover",
					}}
				/>
				<Typography variant="h5">12</Typography>
			</Stack>
		</Button>
	);
};

{
	/* <Tooltip
			TransitionComponent={Zoom}
			TransitionProps={{ easing: { enter: "cubic-bezier(.02,1.79,.31,.89)", exit: "cubic-bezier(.2,1.79,.28,.77)" }, timeout: { enter: 600, exit: 300 } }}
			placement="top"
			sx={{ background: "transparent" }}
			slotProps={{ popper: { sx: { background: "transparent" } } }}
			title={
				<Box
					sx={{
						transform: "translateX(-60%)",
						minWidth: "30rem",
						minHeight: "30rem",
						backgroundImage: `url${url}`,
						backgroundRepeat: "no-repeat",
						borderRadius: 50,
						backgroundSize: "cover",
					}}
				/>
			}
		>
			
		</Tooltip> */
}
