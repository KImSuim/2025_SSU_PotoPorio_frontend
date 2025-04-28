import { useState } from "react";

interface LoginFormData {
  username: string;
  password: string;
}

export const useLoginForm = (onLogin: (username: string, password: string) => Promise<void>) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // 에러 초기화
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onLogin(formData.username, formData.password);
    } catch (err) {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
};
