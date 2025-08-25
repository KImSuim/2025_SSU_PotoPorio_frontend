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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-[#FCF8F2] p-10 rounded-2xl shadow-xl w-full max-w-md font-subtitle">
        <h2 className="text-xl font-bold mb-6 text-[#33974D]">비밀번호 확인</h2>
        <input
          type="password"
          placeholder="비밀번호 (숫자 4자리)"
          value={password}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d{0,4}$/.test(val)) setPassword(val);
          }}
          maxLength={4}
          className="w-full border-1 p-3 text-xl font-semibold text-black mb-6 focus:outline-none focus:border-[#015FCC] focus:border-1  focus:rounded-md transition-all"
        />
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="bg-[#ABD9B7] text-white px-5 py-2.5 rounded-lg font-semibold text-xl hover:bg-[#33974D] transition-colors">
            취소
          </button>
          <button onClick={handleConfirm} className="bg-[#33974D] text-white px-5 py-2.5 rounded-lg font-semibold text-xl hover:bg-[#267a39] transition-colors">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
