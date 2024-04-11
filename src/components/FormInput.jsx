/* eslint-disable react/prop-types */
import './FormInput.css'
import seePassIcon from '../images/seePass.svg'
import notSeePassIcon from '../images/notSeePass.svg'
import { useState } from 'react';

function FormInput({ type, name, defaultValue, label, ...props }) {

  const [seePassword, setSeePassword] = useState(false)

  const handleClick = () => {
    setSeePassword(!seePassword);
  };

  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          defaultValue={defaultValue}
          type={seePassword ? 'text' : type}
          name={name}
          className="input"
          {...props}
          style={{ ...props }}
        />
        {
          type === 'password' &&
            <img 
              style={{ marginLeft: '10px', width: '30px', height: '30px' }} 
              src={seePassword ? seePassIcon : notSeePassIcon} alt='See password'
              onClick={handleClick}
            />
        }
      </div>
    </div>
  );
}

export default FormInput;
