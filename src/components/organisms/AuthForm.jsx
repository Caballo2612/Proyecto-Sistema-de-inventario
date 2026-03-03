import React from 'react'

const AuthForm = ({ type, active, title, children, text, id, onSubmit }) => {
    return (
        <div
            className={`form ${type} ${active ? 'active' : ''} `}
        >
            <h2>{title}</h2>
            <p>{text}</p>
            <form id={id} onSubmit={onSubmit}>{children}</form>
        </div>
    )
}

export default AuthForm