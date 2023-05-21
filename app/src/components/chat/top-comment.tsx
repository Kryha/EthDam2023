import { North, South } from "@mui/icons-material";
import { Avatar, IconButton, Paper, Stack, StackProps, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useContractConnectDownvote, useContractConnectUpvote, useContractGetMessageById } from "../../services/contract-call";
import { useQuery, useQueryClient } from "react-query";
import { useCommentsStore } from "@store/comments";
import { ExtendedMessage } from "./comments";
import { Message } from "@blockbusters/ssb-types";

interface Props extends StackProps {
	comment: ExtendedMessage;
}
// username={msg.content.username} message={msg.content.message} messageId={msg.id} count={msg.count}
export const TopComment = ({ comment, ...rest }: Props) => {
	const { content, count = 0, id, author } = comment;
	const client = useQueryClient();
	const { message } = content;
	const { top, setTop } = useCommentsStore((state) => state);

	const [countTest, setCountTes] = useState(count);
	const { callGetMessageById } = useContractGetMessageById();

	useMemo(async () => {
		if (count === undefined) {
			setCountTes((await callGetMessageById(id)) ?? 0);
		}
	}, [id, count]);

	const onSuccess = (data: number) => {
		if (Boolean(data > top?.count)) {
			client.removeQueries(["comments"]);
			setTop(comment);
		}
	};

	const { data } = useQuery(["count", id], async () => await callGetMessageById(id), { onSuccess, refetchInterval: 500 });

	const { callUpvote } = useContractConnectUpvote();
	const { callDownvote } = useContractConnectDownvote();

	return (
		<Stack
			{...rest}
			component={Paper}
			sx={{
				borderRadius: 2,
				width: 1,
				overflow: "hidden",
				...rest.sx,
			}}
		>
			<Stack direction="row" spacing={2} sx={{ p: 1 }}>
				<Avatar src={`https://api.dicebear.com/6.x/open-peeps/svg?seed=${author}`} />
				<Stack>
					<Typography variant="body1" fontWeight="bold" color="secondary">
						{author}
					</Typography>
					<Typography variant="body1" color="secondary">
						{message}
					</Typography>
				</Stack>
			</Stack>
			<Stack
				direction="row"
				justifyContent="space-between"
				spacing={1}
				px={1}
				sx={{
					// p: 0.2,
					bgcolor: "primary.main",
					background: "linear-gradient(70deg, #67CFEB, #A9EA50, #CA38EB,#67CFEB, #A9EA50)",
					backgroundSize: "200% 100%",
					animation: "gradient 5s ease alternate-reverse infinite",
				}}
			>
				<Typography variant="h6" color="primary">
					{data ?? count}
				</Typography>
				<Stack direction="row" spacing={2}>
					<IconButton
						size="small"
						sx={{ bgcolor: "primary.main" }}
						onClick={() => {
							callUpvote(id, 1);
						}}
					>
						<North fontSize="small" color="secondary" />
					</IconButton>
					<IconButton
						size="small"
						sx={{ bgcolor: "primary.main" }}
						onClick={() => {
							callDownvote(id, 1);
						}}
					>
						<South fontSize="small" color="secondary" />
					</IconButton>
				</Stack>
			</Stack>
		</Stack>
	);
};
