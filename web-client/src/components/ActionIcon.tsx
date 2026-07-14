import {useState } from "react"
import profile from "../assets/profile.png"
import type { Item } from "./BaseComponents/OptionList"
import { OptionList } from "./BaseComponents/OptionList"

interface ActionIconProps{
    items: Item[]
    className?: string
    icon?: string
}


export function ActionIcon({items, className="", icon="ellip"}: ActionIconProps){
    const [isClick, setIsClick] = useState(false)

    return (
        <div className={`relative ${className}`}>
            {icon === 'ellip' && <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="size-6 cursor-pointer"
                onClick={()=> setIsClick(!isClick)}
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
                />
            </svg>}

            {icon === 'profile' && 
                <img src={profile} alt="profile" 
                    onClick={()=> setIsClick(!isClick)}
                    className="h-10 w-10 cursor-pointer"
                />
            
            }


            {isClick && (
                <OptionList items={items} setIsClick={setIsClick}></OptionList>
            )}
        
        </div>
    )
}