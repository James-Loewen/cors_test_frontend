export const InputLabelGroup = ({
  label,
  name,
  type,
  value,
  handleChange,
  required,
  parentClassName,
  ...other
}) => {
  return (
    <div className={`input-label-group ${parentClassName}__${name}`}>
      <label htmlFor={name}>{label}</label>
      <input
        required={required}
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        {...other}
      />
    </div>
  )
}