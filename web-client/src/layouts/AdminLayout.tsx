import profile from "@/assets/profile.png"
import { PlaySquare } from "lucide-react";
import { NavLink, Outlet } from "react-router";

export function AdminLayout(){
  const menuItems = [
    { icon: PlaySquare, label: "Courses", path: "/admin/courses" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-900 font-sans w-full">
      
      {/* 1. Sidebar (Left Column) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col h-screen sticky top-0 z-20">
        <div className="p-6 flex flex-col items-center border-b border-slate-200">
            <img src={profile} alt="Profile" className="w-full h-full object-cover rounded-full" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="space-y-1 px-2">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                {/* ใช้ NavLink เพื่อจัดการสถานะ Active อัตโนมัติ */}
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => `
                    w-full flex items-center gap-4 px-4 py-2.5 rounded-md font-medium text-sm transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  <item.icon size={18} /> {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* 2. Main Content (Right Column - Dynamic) */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-white">
        <div className="flex flex-col h-full max-w-6xl mx-auto w-full">
          {/* นำหน้าลูกๆ มาเสียบตรงนี้ */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}