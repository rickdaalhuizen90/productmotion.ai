import { useGoogleAuth } from "~/hooks/useGoogleAuth";
import GoogleIcon from "~/assets/vectors/google.svg?react";
import { Dropdown } from "./Dropdown";

export interface ProfileProps {
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
}

export function Profile({ isDropdownOpen, onToggleDropdown }: ProfileProps) {
  const { profile, login, handleLogout, isLoading } = useGoogleAuth();

  if (isLoading) {
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (!profile) {
    return (
      <button
        onClick={() => login()}
        aria-label="Sign in with Google"
        className="cursor-pointer"
      >
        <GoogleIcon className="w-full" />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        id="user-menu-button"
        onClick={onToggleDropdown}
        className="flex items-center focus:outline-none rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        aria-label="Open user menu"
      >
        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-lg">
          {profile.name?.charAt(0).toUpperCase() ?? 'U'}
        </div>
      </button>

      <Dropdown
        profile={profile}
        isOpen={isDropdownOpen}
        onLogout={handleLogout}
      />
    </div>
  );
}

