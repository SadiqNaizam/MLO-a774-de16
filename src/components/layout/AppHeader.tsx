import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile menu
import { Menu, Package2, Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input'; // For search
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Example navigation items for the header
const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/orders", label: "Orders" },
  { href: "/products", label: "Products" },
  { href: "/analytics", label: "Analytics" },
];

const AppHeader: React.FC = () => {
  console.log("Rendering AppHeader");

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">App Name</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Optional: Breadcrumb or Page Title area, can be managed by a separate component or page layout */}
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Placeholder for global search if needed */}
        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        /> */}
      </div>

      {/* User Actions: Notifications, Profile Dropdown */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User Avatar" /> {/* Replace with actual user image */}
                <AvatarFallback>UA</AvatarFallback> {/* User Initials */}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link to="/user-profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;