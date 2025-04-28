const Header = ({ author, createdAt }: { author: string; createdAt: string }) => {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{author}</h3>
        <p className="text-sm text-gray-500">{createdAt}</p>
      </div>
    </div>
  );
};

export default Header;
