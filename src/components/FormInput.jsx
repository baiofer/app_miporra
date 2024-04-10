/* eslint-disable react/prop-types */
import './FormInput.css'

function FormInput({ type, name, defaultValue, label, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        defaultValue={defaultValue}
        type={type}
        name={name}
        className="input"
        {...props}
        style={{ ...props }}
      />
    </div>
  );
}

export default FormInput;
