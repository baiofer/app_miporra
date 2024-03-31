import React from "react";

function Button({ type, children, ...props }) {
  return <button className={type} {...props} style={{...props}}>{children}</button>;
}

export default Button;
