
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  Building2,
  BarChart3,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoFull from "../common/LogoFull";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isNavOpen, setIsNavOpen] = useState(!isMobile);
  
  const user = JSON.parse(localStorage.getItem("user") || '{"name": "Guest", "email": "guest@example.com"}');
  const isAdmin = user.role === "admin";
  
  useEffect(() => {
    if (isMobile) {
      setIsNavOpen(false);
    } else {
      setIsNavOpen(true);
    }
  }, [isMobile]);
  
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    navigate("/");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      title: "My Bookings",
      icon: <Calendar className="h-5 w-5" />,
      path: "/bookings",
    },
    {
      title: "Account Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];
  
  // Admin-only menu items
  if (isAdmin) {
    menuItems.push({
      title: "Admin Panel",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/admin",
    });
  }

  const userInitials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-deskhive-skyblue flex">
      {/* Sidebar - Fixed position */}
      <aside
        className={`${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <Link to="/" className="flex items-center">
              <LogoFull />
            </Link>
          </div>
          
          <nav className="flex-1 overflow-y-auto px-3 py-6">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                      location.pathname === item.path
                        ? "bg-deskhive-navy text-white"
                        : "text-deskhive-darkgray hover:bg-deskhive-skyblue"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 px-3">
              <h3 className="text-xs uppercase text-gray-500 font-medium mb-3">Information</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/help"
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-deskhive-darkgray hover:bg-deskhive-skyblue"
                  >
                    <AlertCircle className="h-5 w-5 mr-3" />
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="/company"
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-deskhive-darkgray hover:bg-deskhive-skyblue"
                  >
                    <Building2 className="h-5 w-5 mr-3" />
                    About DeskHive
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-9 w-9 mr-3">
                  <AvatarFallback className="bg-deskhive-navy text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-deskhive-darkgray">
                    {user.name}
                  </p>
                  <p className="text-xs text-deskhive-darkgray/70">{user.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5 text-deskhive-darkgray/70 hover:text-deskhive-darkgray" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isNavOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleNav}
        ></div>
      )}

      {/* Main content - with left padding to accommodate fixed sidebar */}
      <div className={`flex-1 flex flex-col ${isNavOpen && !isMobile ? 'ml-64' : ''} transition-all duration-300 w-full`}>
        {/* Top navigation */}
        <header className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleNav}
              className="mr-2"
            >
              {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-lg font-medium text-deskhive-navy">
              {location.pathname === "/dashboard"
                ? "Dashboard"
                : location.pathname === "/bookings"
                ? "My Bookings"
                : location.pathname === "/settings"
                ? "Account Settings"
                : location.pathname === "/admin"
                ? "Admin Panel"
                : "DeskHive"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-deskhive-navy text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content - make sure it respects the width constraints */}
        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-full px-4 md:px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
