import React from 'react'

const Hero = ({ type, active, title, text, buttontext, onClick }) => {
    return (
        <div
            className={`hero ${type} ${active ? 'active' : ""}`}
        >
            <h2>{title}</h2>
            <p>{text}</p>
            <button type="button" onClick={onClick}>
                {buttontext}
            </button>
        </div>
    )
}

export default Hero