import { create } from "zustand";
import { WalletSlice, createWalletSlice } from "./wallet";

export const useStore = create<WalletSlice>()((...a) => ({
  ...createWalletSlice(...a),
}));
