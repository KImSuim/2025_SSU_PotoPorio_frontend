import { useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: 실제 API 연동 시 구현
      await new Promise((resolve) => setTimeout(resolve, 1000)); // API 호출 시뮬레이션
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
      setUsername(username);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return {
    isLoggedIn,
    username,
    handleLogin,
    handleLogout,
  };
};
