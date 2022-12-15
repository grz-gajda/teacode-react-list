export type TextInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function TextInput({
  name,
  label,
  placeholder,
  onChange,
}: TextInputProps) {
  return (
    <>
      {label && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </>
  );
}
