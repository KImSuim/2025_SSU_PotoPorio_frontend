"use client";
import InputField from "@/components/Common/bases/InputField";
import { useLoginForm } from "@/components/Common/Header/hooks/useLoginForm";

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<void>;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const { formData, isLoading, error, handleChange, handleSubmit } = useLoginForm(onLogin);

  return (
    <div>
      <InputField type="text" placeholder="아이디" value={formData.username} onChange={(value) => handleChange("username", value)} />
      <InputField type="password" placeholder="비밀번호" value={formData.password} onChange={(value) => handleChange("password", value)} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "로그인 중..." : "로그인"}
      </button>
    </div>
  );
}
