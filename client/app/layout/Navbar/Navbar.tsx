import { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Links } from "./Links";
import { Profile } from "./Profile";
import { Mobile } from "./Mobile";

export function Logo() {
  return (
    <div className="flex items-center space-x-3 rtl:space-x-reverse md:w-1/4">
      <Link to="/" className="no-underline self-center text-xl font-semibold whitespace-nowrap">
        ProductMotion.ai
      </Link>
    </div>
  );
}

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    setIsDropdownOpen(false);
  }, []);

  return (
    <nav className="fixed w-full z-20 top-0 left-0 border-b border-gray-200 backdrop-filter backdrop-blur-lg bg-opacity-30 mix-blend-multiply">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <Logo />

        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse items-center md:w-1/4 justify-end">
          <Profile
            isDropdownOpen={isDropdownOpen}
            onToggleDropdown={toggleDropdown}
          />
          <Mobile
            isOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
          />
        </div>

        <Links isVisible={isMobileMenuOpen} />
      </div>
    </nav>
  );
}

