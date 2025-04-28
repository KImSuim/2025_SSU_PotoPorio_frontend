const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">{children}</div>;
};

export default Card;
