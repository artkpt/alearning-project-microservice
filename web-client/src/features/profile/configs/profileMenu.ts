export type MenuItemConfig = {
  label: string;
  type: 'navigate' | 'submit';
  payload: any;
  className?: string;
};

export const profileMenuConfigs: Record<'admin' | 'user', MenuItemConfig[]> = {
  admin: [
    { 
      label: "Create user", 
      type: "navigate", 
      payload: "/users/create" 
    },
    {
      label: "Create course", 
      type: "navigate", 
      payload: "/courses/create" 
    },
    { 
      label: "Logout", 
      type: "submit", 
      payload: { method: "POST", action: "/logout" },
      className: "text-red-600 focus:text-red-600 focus:bg-red-50"
    },
  ],
  user: [
    { 
      label: "Logout", 
      type: "submit", 
      payload: { method: "POST", action: "/logout" },
      className: "text-red-600 focus:text-red-600 focus:bg-red-50"
    },
  ]
};