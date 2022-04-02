import { useRecoilState, useRecoilValue } from "recoil"
import { Item } from "../data/item.model";
import { listCountSelector } from "../data/list-count.selector";
import { listState } from "../data/list.atom";

export const useList = (): { list: Item[], addItem: (item: Item) => void, removeItem: (item: Item) => void, resetList: () => void, count: number } => {
    const [list, setList] = useRecoilState(listState);
    const count = useRecoilValue(listCountSelector);

    const addItem = (item: Item): void => {
        setList((prevList) => [...prevList, item]);
    }
    const removeItem = (item: Item): void => {
        setList((prevList) => prevList.filter((prevItem) => prevItem.id !== item.id));
    }
    const resetList = (): void => {
        setList([]);
    }



    return { list, addItem, removeItem, resetList, count };
}