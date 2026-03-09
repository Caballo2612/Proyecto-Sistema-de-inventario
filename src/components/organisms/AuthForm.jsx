import React from 'react'

const AuthForm = ({ title, children, text, id, onSubmit }) => {
    return (
        <div
            className={`form active`}
        >
            <h2 className=''>{title}</h2>
            <p>{text}</p>
            <form id={id} onSubmit={onSubmit} className='overflow-x-hidden'>
                {children}    
            </form>
        </div>
    )
}

export default AuthForm