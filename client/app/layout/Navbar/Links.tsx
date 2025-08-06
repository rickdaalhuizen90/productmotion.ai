import { Link } from "react-router";

const items = [
  { id: 'home', path: '/', label: 'Home' },
  { id: 'features', path: '/features', label: 'Features' },
  { id: 'prices', path: '/prices', label: 'Prices' },
  { id: 'contact', path: '/contact', label: 'Contact' }
] as const;

interface LinksProps {
  isVisible: boolean;
}

export function Links({ isVisible }: LinksProps) {
  return (
    <div
      className={`justify-center w-full md:flex md:w-1/2 md:order-1 ${
        isVisible ? 'block' : 'hidden'
      }`}
      id="navbar-sticky"
    >
      <ul className="flex flex-col p-4 md:p-0 m-0 list-none font-medium border border-gray-100 rounded-lg md:flex-row md:border-0 md:mx-auto md:justify-center md:space-x-8 rtl:space-x-reverse">
        {items.map(({ id, path, label }) => (
          <NavLink key={id} path={path} label={label} />
        ))}
      </ul>
    </div>
  );
}

interface NavLinkProps {
  path: string;
  label: string;
}

function NavLink({ path, label }: NavLinkProps) {
  return (
    <li className="my-0">
      <Link
        to={path}
        className="block no-underline py-2 px-3 text-gray-900 rounded-sm md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
      >
        {label}
      </Link>
    </li>
  );
}

