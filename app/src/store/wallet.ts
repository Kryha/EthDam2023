import { StateCreator } from "zustand";

interface Client {
  isConnected: boolean;
  address?: string;
}

export interface WalletSlice {
  haveMetamask: boolean;
  setHaveMetamask: (haveMetamask: boolean) => void;

  client: Client | undefined;
  setclient: (client: Client) => void;
}

export const createWalletSlice: StateCreator<
  WalletSlice,
  [],
  [],
  WalletSlice
> = (set) => ({
  haveMetamask: false,
  client: undefined,

  setHaveMetamask: (haveMetamask) => set(() => ({ haveMetamask })),
  setclient: (client) => set(() => ({ client })),
});
