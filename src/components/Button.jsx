/* eslint-disable react/prop-types */
import './Button.css'

function Button({ variant, children, ...props }) {
  return <button className={variant} {...props} style={{...props}}>{children}</button>;
}

export default Button;
