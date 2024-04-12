/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './MessageComponent.css'



const MessageComponent = ({messageText}) => {

    const [message, setMessage] = useState(messageText)

    useEffect(() => {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => {
                clearTimeout(timer);
            };
        }, [message]);

    return (
        <div>
            <div 
                className="login-page-message" 
            >
                <div className='login-message'>
                    { messageText }
                </div>
            </div>
        </div>
    )
}

export default MessageComponent