import { useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { Item } from "../data/item.model";
import { lastItemState } from "../data/last-item.atom";
import { listCountSelector } from "../data/list-count.selector";
import { listState } from "../data/list.atom";

export const useList = (): { list: Item[], addItem: (item: Item) => void, removeItem: (item: Item) => void, resetList: () => void, count: number } => {
    const [list, setList] = useRecoilState(listState);
    const setLastItem = useSetRecoilState(lastItemState);
    const count = useRecoilValue(listCountSelector);

    const addItem = useCallback((item: Item): void => {
        setList((prevList) => [...prevList, item]);
    }, [setList]);
    const removeItem = useCallback((item: Item): void => {
        setList((prevList) => prevList.filter((prevItem) => prevItem.id !== item.id));
    }, [setList]);
    const resetList = useCallback((): void => {
        setList([]);
        setLastItem({ value: '', id: '', timestamp: '' });
    }, [setList, setLastItem]);



    return { list, addItem, removeItem, resetList, count };
}