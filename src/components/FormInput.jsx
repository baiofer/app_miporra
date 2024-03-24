import React from "react";

function FormInput({ type, name, defaultValue, label }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} defaultValue={defaultValue} />
    </div>
  );
}

export default FormInput;
