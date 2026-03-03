import React from 'react';

const Input = ({ type, name, placeholder, value, onChange, required, id }) => {
    return (
            <div className="relative">
                <input 
                    className="w-full peer p-3 pt-4 pl-10 pr-4 border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed border-gray-500 focus:border-blue-600" 
                    type={type}
                    id={id} 
                    placeholder=""
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                <label className="absolute text-gray-500 text-base duration-150 transform top-4 left-10 z-10 origin-left peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:scale-75">
                    {placeholder}
                </label>
                <svg className="absolute top-5 left-4" width={18} height={18} viewBox="0 0 344 384">
                    <path d="M170.5 192q-35.5 0-60.5-25t-25-60.5T110 46t60.5-25T231 46t25 60.5t-25 60.5t-60.5 25zm0 43q31.5 0 69.5 9t69.5 29.5T341 320v43H0v-43q0-26 31.5-46.5T101 244t69.5-9z" fill="#6b7280" />
                </svg>
            </div>
    );
}

export default Input;

