
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LogoFull from "../common/LogoFull";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <LogoFull />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "text-deskhive-navy"
                  : "text-deskhive-darkgray/70 hover:text-deskhive-navy"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/features"
                  ? "text-deskhive-navy"
                  : "text-deskhive-darkgray/70 hover:text-deskhive-navy"
              }`}
            >
              Features
            </Link>
            {/* Pricing link removed */}
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/contact"
                  ? "text-deskhive-navy"
                  : "text-deskhive-darkgray/70 hover:text-deskhive-navy"
              }`}
            >
              Contact
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Button asChild variant="default" className="btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-deskhive-navy hover:bg-deskhive-navy/5">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild variant="default" className="btn-primary">
                  <Link to="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-deskhive-navy">
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass pt-2 pb-4 px-4">
          <div className="space-y-1">
            <Link 
              to="/" 
              onClick={toggleMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/"
                  ? "text-deskhive-navy bg-deskhive-navy/5"
                  : "text-deskhive-darkgray/70 hover:text-deskhive-navy hover:bg-deskhive-navy/5"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              onClick={toggleMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/features"
                  ? "text-deskhive-navy bg-deskhive-navy/5"
                  : "text-deskhive-darkgray/70 hover:text-deskhive-navy hover:bg-deskhive-navy/5"
              }`}
            >
              Features
            </Link>
            {/* Pricing link removed from mobile menu */}
            <Link 
              to="/contact" 
              onClick={toggleMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/contact"
                  ? "text-deskhive-navy bg-deskhive-navy/5"
                  : "text-deskhive-darkgray/70 hover:text-deskhive-navy hover:bg-deskhive-navy/5"
              }`}
            >
              Contact
            </Link>
            
            <div className="pt-4 flex flex-col space-y-2">
              {isLoggedIn ? (
                <Button asChild variant="default" className="btn-primary w-full">
                  <Link to="/dashboard" onClick={toggleMobileMenu}>Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5 w-full">
                    <Link to="/login" onClick={toggleMobileMenu}>Log in</Link>
                  </Button>
                  <Button asChild variant="default" className="btn-primary w-full">
                    <Link to="/register" onClick={toggleMobileMenu}>Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
