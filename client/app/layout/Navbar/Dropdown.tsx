interface DropdownProps {
  profile: {
    name?: string;
    email?: string;
  };
  isOpen: boolean;
  onLogout: () => void;
}

export function Dropdown({ profile, isOpen, onLogout }: DropdownProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-30 bg-white border border-gray-100"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      <div className="px-4 py-2 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {profile.name ?? 'User'}
        </p>
        {profile.email && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {profile.email}
          </p>
        )}
      </div>
      <button
        onClick={onLogout}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
        role="menuitem"
      >
        Logout
      </button>
    </div>
  );
}

