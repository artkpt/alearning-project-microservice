import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetClose} from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { ProfileIcon } from "../features/profile/ProfileIcon";
import { useAuth } from "../features/auth/stores/authStore";
import { BookOpen, PlaySquare } from "lucide-react";

export function Header({ className = "" }) {
  const { auth } = useAuth()
  const menuList = [
    { name: "Notes", link: "/notes", icon: BookOpen},
    { name: "Courses", link: "/courses", icon: PlaySquare },
  ];

  return (
    <header className={`flex items-center justify-between min-h-16 px-4 py-4 border-b border-border gap-2 flex-nowrap bg-background ${className}`}>
      <div className="flex items-center gap-2">
        
        <Sheet>
          <SheetTrigger aschild>
            <Button variant="outline" size="icon" className="shrink-0 ">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          
            <SheetContent side="left" className="w-72 p-0 flex flex-col">
            {/* ส่วนหัวของ Sidebar */}
            <div className="p-6 border-b border-border">
                <SheetHeader>
                <SheetTitle className="text-2xl text-left font-sans font-bold">
                    Alearning
                </SheetTitle>
                </SheetHeader>
            </div>

            {/* ส่วนรายการเมนู */}
            <div className="p-4 flex-1 overflow-y-auto">
                <ul className="w-full space-y-1">
                {menuList.map((menu) => {
                    const Icon = menu.icon; 
                    return (
                    <li key={menu.name} className="w-full block">
                        <SheetClose aschild>
                        <Link
                            to={menu.link}
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-foreground hover:bg-muted hover:text-orange-600 transition-colors"
                        >
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            {menu.name}
                        </Link>
                        </SheetClose>
                    </li>
                    );
                })}
                </ul>
            </div>
            </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="logo" className="w-8 h-8 shrink-0" />
          <h1 className="hidden sm:block font-sans text-xl font-semibold">
            Alearning
          </h1>
        </Link>
      </div>

      {/* search */}
      <div className="grow shrink flex justify-end md:justify-center max-w-md px-4 hidden sm:flex">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes or courses..."
            className="w-full pl-8 bg-muted/50"
          />
        </div>
      </div>

      {/* profile */}
      <div className="flex items-center gap-2 shrink-0">
        {!auth ? (
          <Button aschild>
            <Link to="/login">Sign in</Link>
          </Button>
        ) : (
          <ProfileIcon />
        )}
      </div>
      
    </header>
  );
}