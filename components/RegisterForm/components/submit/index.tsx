"use client";
import { useRouter } from "next/navigation";

const Submit = () => {
  const router = useRouter();

  return (
    <div className="flex justify-end space-x-4">
      <button type="button" onClick={() => router.push("/")} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
        취소
      </button>
      <button type="button" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        등록
      </button>
    </div>
  );
};

export default Submit;
