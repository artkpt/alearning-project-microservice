import { Link } from "react-router";

interface LinkButtonProps{
    to: string
    className?: string
    children?: string
}

export function LinkButton({to, className="", children}:LinkButtonProps){
    return (
        <Link to={to} className={`px-4 py-1.25 h-8 text-sm border border-main-contrast 
        rounded-sm cursor-pointer disabled:cursor-default shrink-0 grow-0 ${className}`}>
            {children}
        </Link>
    )
}