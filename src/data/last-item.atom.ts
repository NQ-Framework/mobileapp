import { atom } from "recoil";
import { Item } from "./item.model";
import { localStorageEffect } from "./local-storage.effect";

export const lastItemState = atom<Item>({
    key: 'lastItemState',
    default: { value: '', timestamp: '', id: '' },
    effects: [
        localStorageEffect<Item>('lastItemState')
    ]
});