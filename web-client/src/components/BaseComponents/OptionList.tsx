import type { Dispatch, SetStateAction } from "react";
import { Fragment } from "react/jsx-runtime";

type OptionListProps = {
    items: Items
    setIsClick: Dispatch<SetStateAction<boolean>>
}

export type Items = Item[]

export interface Item{
    header?: string
    options: Option[]
}

interface Option{
    label: string
    key: string
    action: ()=>any   
}

export function OptionList({items, setIsClick}: OptionListProps){
    return (
        <div className="absolute top-full right-0 border border-main-contrast bg-white
        rounded-sm shadow-md shadow-main-contrast w-30"> 
            <ul>
                { items.map((item, index)=> (
                        <Fragment key={index}>
                            {item.header && (
                                <div className="mt-2 pb-1.5 w-full px-4 font-medium border-b border-main-contrast">
                                   
                                    {item.header}
                                 
                                </div>    
                            )}
                            
                            { item.options.map((option,index) => (
                                <li key={index}> 
                                    <button 
                                        onClick={()=>{
                                            option.action()
                                            setIsClick(false)
                                        }}
                                        className="w-full text-left cursor-pointer px-4 py-1.5"
                                    >
                                        {option.label}
                                    </button>
                                </li>
                            ))} 
                        </Fragment>
                ))}
            </ul>
        </div>
    )
} 