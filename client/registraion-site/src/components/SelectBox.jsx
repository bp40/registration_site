export const SelectBox = ({
  labelText,
  options,
  optionsValue,
  placeholderText,
  onChange,
  defaultVal,
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={onChange}
        defaultValue={defaultVal}
      >
        <option disabled>{placeholderText}</option>
        {options.map((option, index) => (
          <option key={optionsValue[index]} value={optionsValue[index]}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
