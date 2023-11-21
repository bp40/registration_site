export const SelectBox = ({
  labelText,
  options,
  optionsValue,
  placeholderText,
  onChange,
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={onChange}
      >
        <option disabled selected>
          {placeholderText}
        </option>
        {options.map((option, index) => (
          <option value={optionsValue[index]}> {option} </option>
        ))}
      </select>
    </div>
  );
};
