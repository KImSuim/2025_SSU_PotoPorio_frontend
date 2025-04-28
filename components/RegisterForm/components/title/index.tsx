import { useRegisterFormData } from "../../hooks/useFormData";

const Title = () => {
  const { formData, handleChange } = useRegisterFormData();
  return (
    <div className="mb-6">
      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
        제목
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="이름을 입력해주세요"
      />
    </div>
  );
};

export default Title;
