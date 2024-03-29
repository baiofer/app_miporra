import React from "react";

function FormInput({ type, name, defaultValue, label, isDisabled }) {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        disabled={isDisabled}
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input"
      />
    </div>
  );
}

export default FormInput;
