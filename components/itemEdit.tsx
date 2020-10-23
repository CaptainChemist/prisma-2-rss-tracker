import { Dispatch, SetStateAction } from "react"
import { BundleObject, FeedObject, ItemType, SelectedFeedState } from "../utils/types"


export const ItemEdit = ({
    item,
    type,
    selected,
    setSelected,
}:{
    item: FeedObject | BundleObject;
    type: ItemType;
    selected?: SelectedFeedState;
    setSelected?: Dispatch<SetStateAction<SelectedFeedState>>;
})=> {
    const isFeed = type === ItemType.FeedType;
    console.log(selected)

    return (
        <div 
        onClick={e=> {
            e.stopPropagation() 
            setSelected({ id: item.id, feeds: isFeed ? [item] : item['feeds'], editMode: selected.editMode ? false : true, newMode: false });
        }}
        className="flex py-2 mx-1 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            className={`h-6 w-6 ${item.id === selected.id && selected.editMode? `text-${isFeed ? 'green' : 'purple'}-400`:`text-gray-500`} inline-block align-middle`}
            >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        </div>

    )
}