import React from "react";

function FormInput({ type, name, defaultValue, label, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input"
        {...props}
        style={{...props}}
      />
    </div>
  );
}

export default FormInput;
