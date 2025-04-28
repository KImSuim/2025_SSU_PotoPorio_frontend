import Button from "@/components/Common/bases/Button";

interface UserStatusProps {
  name: string;
  onLogout: () => void;
}

export default function UserStatus({ name, onLogout }: UserStatusProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-700">{name}님 환영합니다! </span>
      <Button variant="danger" onClick={onLogout}>
        로그아웃
      </Button>
    </div>
  );
}
