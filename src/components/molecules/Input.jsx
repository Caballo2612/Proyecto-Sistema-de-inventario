import React, { useState } from 'react';

const Input = ({ type, name, placeholder, value, onChange, required, id, disabled, showRules }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [password, setPassword] = useState("");

    const rules = [
        {
            label: "At least 8 characters",
            condition: password.length >= 8
        },
        {
            label: "At least one uppercase letter",
            condition: /[A-Z]/.test(password)
        },
        {
            label: "At least one number",
            condition: /[0-9]/.test(password)
        },
        {
            label: "At least one special character",
            condition: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        }
    ]

    if (type === "password") {
        return (
            <div className='flex flex-col gap-2'>
                <div className="flex items-center relative">
                    <input
                        className="w-full peer p-3 pt-4 pl-10 pr-4 border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed border-gray-500 focus:border-blue-600"
                        type={showPassword ? "text" : "password"}
                        id={id}
                        name={name}
                        placeholder=""
                        required={required}
                        disabled={disabled}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            onChange && onChange(e);
                        }}
                    />
                    <label className="absolute text-gray-500 text-base duration-150 transform top-4 left-10 z-10 origin-left peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:scale-75">
                        {placeholder}
                    </label>
                    <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-105"
                        onClick={togglePasswordVisibility}
                    >{showPassword
                        ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24"><path stroke="black" d="M12 16.01a4 4 0 1 0 0-8 4 4 0 0 0 0 8" /><path stroke="black" d="M2 11.98c6.09-10.66 13.91-10.65 20 0m0 .03c-6.09 10.66-13.91 10.65-20 0" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24"><path stroke="black" d="M14.83 9.18A4 4 0 0 0 8 12.01a4 4 0 0 0 1.16 2.82M12 16.01a4 4 0 0 0 4-4" /><path stroke="black" d="M17.61 6.39 6.38 17.62A21.8 21.8 0 0 1 2 11.99c4.71-8.23 10.44-10.1 15.61-5.6M21 3l-3.39 3.39M6.38 17.62 3 21M19.57 8.43A25.3 25.3 0 0 1 22 12.01c-4 7-8.73 9.39-13.23 7.22" /></svg>
                        }
                    </div>
                    <svg className="absolute top-5 left-4" width={18} height={18} viewBox="0 0 344 384">
                        <path d="M170.5 192q-35.5 0-60.5-25t-25-60.5T110 46t60.5-25T231 46t25 60.5t-25 60.5t-60.5 25zm0 43q31.5 0 69.5 9t69.5 29.5T341 320v43H0v-43q0-26 31.5-46.5T101 244t69.5-9z" fill="#6b7280" />
                    </svg>
                </div>
                {showRules && !disabled &&
                    <div className="flex flex-col p-2 gap-1 bg-white border border-gray-300 rounded">
                        {rules.map((rule, i) => (
                            <span
                                key={i}
                                className={`text-sm ${rule.condition ? 'text-green-500 before:content-["✓"]' : 'before:text-red-500 before:content-["✗"]'} before:mr-1`}
                            >
                                {rule.label}
                            </span>
                        ))}
                    </div>
                }
            </div>
        )
    }

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
                disabled={disabled}
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
