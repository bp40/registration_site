export const TextInput = ({
  labelText,
  placeholder,
  onChange,
  value,
  name,
  inputType = "text",
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
