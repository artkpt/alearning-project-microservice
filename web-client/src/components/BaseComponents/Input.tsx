import type { Ref } from "react";

interface InputProps{
    type: string;
    name?: string;
    onChange?: (event:any)=>void;
    value?: string
    ref?: Ref<HTMLInputElement> | undefined
    
}

export function Input({type, name, onChange, value, ref}: InputProps){
    return (
        <input 
            type={type} 
            name={name} 
            className="border border-main-contrast rounded-md grow shrink max-w-md 
                px-3 py-1.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            onChange={onChange} 
            value={value}
            ref={ref}
        />
    )
}