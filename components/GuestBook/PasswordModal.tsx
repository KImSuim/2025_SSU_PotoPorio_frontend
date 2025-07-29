"use client";

import { useState } from "react";

interface Props {
  onConfirm: (password: string) => void;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function PasswordModal({ onConfirm, onClose, children }: Props) {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    onConfirm(password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="font-subtitle text-lg font-bold mb-4">비밀번호 확인</h2>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d{0,4}$/.test(val)) setPassword(val);
          }}
          maxLength={4}
          className="w-full border p-2 mb-4"
        />
        <div className="font-subtitle">{children}</div>

        <div className="font-subtitle flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            취소
          </button>
          <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
