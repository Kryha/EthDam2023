import { ExtendedMessage } from "@components/chat/comments";
import { create } from "zustand";

export interface CommentsStore {
	top?: ExtendedMessage;
	setTop: (comment: ExtendedMessage) => void;
	removeTop: () => void;
}

export const useCommentsStore = create<CommentsStore>((set) => ({
	top: undefined,
	setTop: (comment) => set(() => ({ top: comment })),
	removeTop: () => set(() => ({ top: undefined })),
}));
