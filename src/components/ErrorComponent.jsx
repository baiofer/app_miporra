/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './ErrorComponent.css'



const ErrorComponent = ({errorText}) => {

    const [error, setError] = useState(errorText)

    useEffect(() => {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => {
                clearTimeout(timer);
            };
        }, [error]);

    return (
        <div>
            <div 
                className="login-page-error" 
            >
                <div className='login-error'>
                    { errorText }
                </div>
            </div>
        </div>
    )
}

export default ErrorComponent