import { selector } from "recoil";
import { listState } from "./list.atom";

export const listCountSelector = selector({
    key: 'listCountSelector',
    get: ({ get }) => {
        const list = get(listState);
        return list.length;
    }
});
