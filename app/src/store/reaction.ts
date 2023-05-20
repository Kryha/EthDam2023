import { create } from "zustand";

export interface ReactionFlow {
	reaction?: string;
	setReaction: (url: string) => void;
	removeReaction: () => void;
}

export const useReactionStore = create<ReactionFlow>((set) => ({
	reaction: undefined,
	setReaction: (url?: string) => set(() => ({ reaction: url })),
	removeReaction: () => set({ reaction: undefined }),
}));
