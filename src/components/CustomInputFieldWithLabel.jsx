export const CustomInputFieldWithLabel = ({
  className,
  label,
  type,
  placeholder,
  getter,
  setter,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={type}
        className="block text-sm font-medium text-text-primary" // 색상 변경
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        value={getter}
        onChange={(e) => setter(e.target.value)}
        required
        className="mt-1 block w-full px-4 py-2 bg-input-bg border border-input-border rounded-md hover:outline hover:outline-1 hover:outline-input-border-hover focus:outline-none focus:ring focus:ring-1 focus:ring-input-border-focused" // 색상 변경
        placeholder={placeholder}
      />
    </div>
  );
};
