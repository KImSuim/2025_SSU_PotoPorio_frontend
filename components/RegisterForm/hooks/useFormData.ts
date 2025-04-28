import { useState } from "react";

export const useRegisterFormData = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (name: string, value: string) => {
    console.log({ name, value });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, handleChange };
};
