import { useWeb3Connect } from "@/services";
import { useStore } from "@/store";
import { Button } from "@mui/material";

export const Wallet = () => {
	const client = useStore((state) => state.client);
	const { connectWeb3 } = useWeb3Connect();

	if (client && client.isConnected) return <Button sx={{ visibility: "hidden" }}>Connect</Button>;

	return (
		<Button variant="contained" onClick={connectWeb3}>
			Connect
		</Button>
	);
};
