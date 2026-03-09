import React from 'react'

const SSOButtons = () => (
    <div className="sso flex gap-4 justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="transition-all hover:drop-shadow-md hover:scale-110 cursor-pointer" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M20 12.05a8 8 0 1 0-9.25 8v-5.67h-2v-2.33h2v-1.77a2.83 2.83 0 0 1 3-3.14q.901.013 1.79.16v2h-1a1.16 1.16 0 0 0-1.3 1.26v1.51h2.22l-.36 2.33h-1.85V20A8 8 0 0 0 20 12.05" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="transition-all hover:drop-shadow-md hover:scale-110 cursor-pointer" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M17.6 6.32A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.88 11.89L4 20l4.2-1.1a7.9 7.9 0 0 0 3.79 1 8 8 0 0 0 8-7.93 8 8 0 0 0-2.39-5.65M12 18.53a6.6 6.6 0 0 1-3.36-.92l-.24-.15-2.49.66.66-2.43-.16-.25a6.6 6.6 0 0 1 10.25-8.17 6.65 6.65 0 0 1 2 4.66 6.66 6.66 0 0 1-6.66 6.6m3.61-4.94c-.2-.1-1.17-.58-1.35-.64s-.32-.1-.45.1a9 9 0 0 1-.63.77c-.11.14-.23.15-.43 0a5.33 5.33 0 0 1-2.69-2.35c-.21-.35.2-.33.58-1.08a.38.38 0 0 0 0-.35c0-.1-.45-1.08-.61-1.47s-.32-.33-.45-.34h-.39a.7.7 0 0 0-.53.25A2.2 2.2 0 0 0 8 10.17a3.8 3.8 0 0 0 .81 2.05 8.9 8.9 0 0 0 3.39 3 3.85 3.85 0 0 0 2.38.5 2 2 0 0 0 1.33-.94 1.6 1.6 0 0 0 .12-.94c-.09-.1-.22-.15-.42-.25" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="transition-all hover:drop-shadow-md hover:scale-110 cursor-pointer" viewBox="0 0 24 24"><path fill="#ffff" d="m19.76 10.77-.09-.35h-7.44v3.16h4.45a4.45 4.45 0 0 1-4.36 3.34 5.2 5.2 0 0 1-3.5-1.39A5 5 0 0 1 7.33 12a5.14 5.14 0 0 1 1.46-3.53 5 5 0 0 1 3.48-1.37 4.55 4.55 0 0 1 3 1.16L17.47 6a7.88 7.88 0 0 0-5.27-2 8.14 8.14 0 0 0-5.77 2.35 8.15 8.15 0 0 0-.09 11.21 8.37 8.37 0 0 0 6 2.44 7.45 7.45 0 0 0 5.41-2.27 8 8 0 0 0 2.08-5.54 10 10 0 0 0-.07-1.42Z" /></svg>
    </div>
);

const Hero = ({ title, text, showButton, buttontext, onClick, showSSO }) => {
    return (
        <div
            className={`hero active signin`}
        >
            <h2>{title}</h2>
            <p>{text}</p>
            {showSSO && 
                <SSOButtons />
            }
            {showButton &&
                <button type="button" onClick={onClick}>
                    {buttontext}
                </button>
            }

        </div>
    )
}

export default Hero