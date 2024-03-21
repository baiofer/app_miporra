import React from "react";

function Button({ type, text }) {
  return <button className={type}>{text}</button>;
}

export default Button;
