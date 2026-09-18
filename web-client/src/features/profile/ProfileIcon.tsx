import { useNavigate, useSubmit } from "react-router";
import { useAuth } from "../auth/stores/authStore";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

import profile from "../../assets/profile.png"
import { profileMenuConfigs, type MenuItemConfig } from "./configs/profileMenu";
import { cn } from "@/lib/utils";

export function ProfileIcon(){
    const {auth} = useAuth()
    const submit = useSubmit()
    const navigate = useNavigate()
    
    const menuItems = auth?.role === 'admin' 
        ? profileMenuConfigs.admin 
        : profileMenuConfigs.user;

    const handleMenuClick = (item: MenuItemConfig) => {
        if (item.type === 'navigate') {
            navigate(item.payload);
        } else if (item.type === 'submit') {
            submit(null, item.payload);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="outline-none rounded-full">
                <img 
                    src={profile} 
                    alt="profile" 
                    className="h-10 w-10 cursor-pointer rounded-full object-cover"
                />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-1">
                <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{auth?.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                    {auth?.role === 'admin' ? 'Administrator' : 'User'}
                    </p>
                </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />

                {menuItems.map((item,index)=>{
                    return (
                        <DropdownMenuItem 
                            key={`${item.label}-${index}`}
                            onClick={() => handleMenuClick(item)}
                            className={cn("cursor-pointer", item.className)}
                        >
                            {item.label}
                        </DropdownMenuItem>
                    )
                })}

            </DropdownMenuContent>
        </DropdownMenu>
  );
}