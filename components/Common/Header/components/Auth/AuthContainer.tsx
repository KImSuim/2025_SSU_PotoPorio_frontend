"use client";

import { useAuth } from "../../hooks/useAuth";
import LoginForm from "./LoginForm";
import UserStatus from "./UserStatus";

export default function AuthContainer() {
  const { isLoggedIn, username, handleLogin, handleLogout } = useAuth();

  return <div>{isLoggedIn ? <UserStatus name={username} onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}</div>;
}
