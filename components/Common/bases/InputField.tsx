interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputField({ type, placeholder, value, onChange }: InputFieldProps) {
  return <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="px-2 py-1 border rounded" />;
}
