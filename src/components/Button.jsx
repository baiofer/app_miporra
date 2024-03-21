import React from "react";

function Button({ type, children }) {
  return <button className={type}>{children}</button>;
}

export default Button;
