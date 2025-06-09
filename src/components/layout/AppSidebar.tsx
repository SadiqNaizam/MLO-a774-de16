import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils'; // For conditionally applying classes
import { ScrollArea } from '@/components/ui/scroll-area';
import { Package2, Home, ShoppingCart, Package, Users, LineChart, Settings } from 'lucide-react'; // Example icons

// Define navigation items for the sidebar
interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/products', label: 'Products', icon: Package },
  // { href: '/customers', label: 'Customers', icon: Users }, // Example
  { href: '/analytics', label: 'Analytics', icon: LineChart },
  // { href: '/settings', label: 'Settings', icon: Settings }, // Example
];

const AppSidebar: React.FC = () => {
  const location = useLocation();
  console.log("Rendering AppSidebar, current path:", location.pathname);

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
      <ScrollArea className="flex-1">
        <nav className="flex flex-col items-start gap-1 px-2 py-4 sm:py-5">
          <Link
            to="/"
            className="group mb-2 flex h-9 w-full shrink-0 items-center justify-start gap-2 rounded-md bg-primary px-3 text-lg font-semibold text-primary-foreground md:h-8 md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span>App Name</span> {/* Replace with your app name/logo */}
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                location.pathname.startsWith(item.href) && "bg-muted text-primary",
                item.disabled && "pointer-events-none opacity-50"
              )}
              aria-disabled={item.disabled}
              tabIndex={item.disabled ? -1 : undefined}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      {/* Optional: Sidebar footer for settings or user */}
      <div className="mt-auto p-4 border-t">
        <Link
            to="/user-profile" // Or settings page
            className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                 location.pathname.startsWith("/user-profile") && "bg-muted text-primary"
            )}
        >
            <Settings className="h-4 w-4" />
            User Profile
        </Link>
      </div>
    </aside>
  );
};

export default AppSidebar;