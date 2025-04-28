export const HeaderContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">{children}</div>
      </nav>
    </header>
  );
};
