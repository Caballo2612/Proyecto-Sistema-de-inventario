import React, { useState, useEffect, useRef } from 'react';

const Input = ({ type, name, placeholder, value, onChange, required, id, disabled, showRules, options, info, label }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [password, setPassword] = useState("");

    const passwordRef = useRef(null)

    const CheckIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
            <path stroke="#22c55e" strokeWidth="1" fill="#22c55e" d="M12.5 22.5L5.5 15.5L7 14L12.5 19.5L25 7L26.5 8.5Z" />
        </svg>
    );

    const XIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
            <path fill="#9ca3af" d="m17.414 16 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95 1.414-1.414 4.95 4.95 4.95-4.95 1.414 1.414z" />
        </svg>
    );

    const rules = [
        {
            label: "Lowercase & Uppercase",
            condition: /([A-Z].*[a-z]|[a-z].*[A-Z])/.test(password)
        },
        {
            label: "At least 8 characters",
            condition: password.length >= 8
        },
        {
            label: "Number (0-9)",
            condition: /[0-9]/.test(password)
        },
        {
            label: "Special character (!@#$%^&)",
            condition: /[!@#$%^&*(),.?":{}|<>-_]/.test(password)
        }
    ]

    const validRules = rules.filter(rule => rule.condition).length;
    const strengthPercent = (validRules / rules.length) * 100;
    const strengthLabel =
        strengthPercent < 50
            ? "débil"
            : strengthPercent < 75
                ? "media"
                : strengthPercent > 90
                    ? "Completa"
                    : "Fuerte";

    const isPasswordValid = rules.every(rule => rule.condition);

    useEffect(() => {
        if (!passwordRef.current) return;

        if (showRules && !isPasswordValid) {
            passwordRef.current.setCustomValidity("La contraseña no es segura");
        } else {
            passwordRef.current.setCustomValidity("");
        }
    }, [password, isPasswordValid, showRules]);

    const renderInput = () => {
        if (type === "selected") {
            return (
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full border-2 border-gray-400 text-gray-700 rounded-md px-3 py-2 bg-gray-100 outline-none"
                >
                    {options.map((opt, i) => (
                        <option key={i} value={opt.value} className="text-gray-500">
                            {opt.label}
                        </option>
                    ))}
                </select>
            );
        }

        if (type === "color") {
            return (
                <div className="w-full flex items-center border-2 border-gray-400 text-gray-700 rounded-md px-3 py-2 bg-gray-100 outline-none">

                    <input
                        type="color"
                        value={value}
                        onChange={onChange}
                        className="w-6 h-7 border-none bg-transparent cursor-pointer mr-2"
                    />

                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="#494949"
                        className="outline-none "
                    />

                </div>
            );
        }

        if (type === "password") {
            return (
                <div className='flex flex-col gap-2'>
                    <div className="flex items-center relative">
                        <input
                            ref={passwordRef}
                            className="w-full peer p-3 pt-4 pl-10 pr-4 border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed border-gray-500 focus:border-blue-600"
                            type={showPassword ? "text" : "password"}
                            id={id}
                            name={name}
                            placeholder=""
                            required={required}
                            value={password}
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
                        <svg fill="none" className="absolute top-5 left-4" height={18} width={18} viewBox="0 0 24 24"><rect width="14" height="10" x="5" y="11" stroke="#6b7280" strokeWidth="2" rx="2"/><path stroke="#6b7280"  strokeWidth="2" d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.2" fill="#6b7280"/></svg>
                    </div>
                    {showRules && !disabled &&
                        <div className="flex flex-col p-2 gap-2 bg-gray-50 border-2 border-gray-200 rounded-md">
                            <label className='text-gray-800'>
                                Tu contraseña debe incluir
                            </label>
                            {rules.map((rule, i) => (
                                <div key={i} className='flex items-center gap-2'>
                                    {rule.condition ? CheckIcon : XIcon}
                                    <span
                                        className="text-sm text-gray-600 before:mr-1"
                                    >
                                        {rule.label}
                                    </span>
                                </div>
                            ))}
                            <div className='flex flex-col gap-1'>
                                <div className="flex justify-between items-center text-sm">
                                    <span className='text-gray-800'>Seguridad</span>
                                    <span className={`${strengthPercent < 50 ? "text-red-400" : strengthPercent < 75 ? "text-yellow-400" : "text-green-400"}`}>{strengthLabel}</span>
                                </div>
                                <div className="w-full h-1 bg-gray-200 rounded-md">
                                    <div
                                        className={`h-full transition-all duration-300 rounded-md ${strengthPercent < 50 ? "bg-red-400" : strengthPercent < 75 ? "bg-yellow-400" : "bg-green-400"}`}
                                        style={{ width: `${strengthPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            )
        }

        return (
            <div className='relative'>
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
        )
    }

    return (
        <div className='relative flex flex-col gap-1'>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{label}</span>

                {info && (
                    <div className="group relative cursor-help">
                        <span
                            className="flex items-center justify-center w-4 h-4 text-xs rounded-full bg-gray-500 text-white"
                        >
                            ?
                        </span>

                        <div className="absolute left-4 top-0 w-50 bg-white px-2 py-1 border border-gray-400 rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                            <span>
                                {info}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <div className="relative">
                {renderInput()}
            </div>
        </div>
    );
}

export default Input;
