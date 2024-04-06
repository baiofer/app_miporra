/* eslint-disable react/prop-types */
import './FormInput.css'

function FormInput({ type, name, label, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
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
