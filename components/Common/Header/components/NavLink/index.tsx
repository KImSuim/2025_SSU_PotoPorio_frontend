import Link from "next/link";

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <Link href={href} className="text-gray-700 hover:text-blue-600 transition-colors">
      {children}
    </Link>
  );
};

export default NavLink;
