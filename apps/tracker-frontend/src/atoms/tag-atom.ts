import { atom } from "recoil";

export const tagAtom = atom<string[]>({
    key: "tagAtom",
    default: [],
});
