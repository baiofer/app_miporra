/* eslint-disable react/prop-types */

function Button({ variant, children, ...props }) {
  return <button className={variant} {...props} style={{...props}}>{children}</button>;
}

export default Button;
