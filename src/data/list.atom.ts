import { atom } from "recoil";
import { Item } from "./item.model";
import { localStorageEffect } from "./local-storage.effect";

export const listState = atom<Item[]>({
    key: 'listState',
    default: [],
    effects: [
        localStorageEffect<Item[]>('listState')
    ]
});