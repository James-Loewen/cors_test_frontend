export const InputLabelGroup = ({
  label,
  name,
  type,
  value,
  handleChange,
  required,
  parentClassName,
  autoCapitalize,
  errorMsg,
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
        autoCapitalize={autoCapitalize}
      />
      {errorMsg && (
        <div className="input-error">Invalid username or password</div>
      )}
    </div>
  )
}