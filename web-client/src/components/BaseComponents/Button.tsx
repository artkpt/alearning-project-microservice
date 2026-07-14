import type { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  type?: "button"| "submit" | "reset";
  onClick?: ()=> void
}

export function Button({children, className= "", disabled, type="button", onClick}: ButtonProps){
    return <button 
              type={type}
              className={`px-4 py-1.25 h-8 text-sm border border-main-contrast 
                  rounded-sm cursor-pointer disabled:cursor-default shrink-0 grow-0 ${className}`}
              disabled={disabled}
              onClick={onClick}
            >
                {children}
            </button>
}
