interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({ onClick, children, variant = "primary" }: ButtonProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-700";
      case "secondary":
        return "bg-gray-600 hover:bg-gray-700";
      case "danger":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-blue-600 hover:bg-blue-700";
    }
  };

  return (
    <button onClick={onClick} className={`px-4 py-1 text-white rounded transition-colors ${getButtonStyle()}`}>
      {children}
    </button>
  );
}
