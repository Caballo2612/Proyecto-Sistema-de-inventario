import { useState } from "react";
import Input from "../components/molecules/Input";
import appFireBase from "../credentials";
import '../components/stylesheets/extra.css'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../components/organisms/AuthForm";
import Hero from "../components/organisms/Hero";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Auth = getAuth(appFireBase)

const Login = () => {

    const navigate = useNavigate(); // ✅ aquí

    const [view, setView] = useState('signin');
    const isSignup = view === 'signup';
    const toggleView = () => {
        setView(isSignup ? 'signin' : 'signup');
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            if (isSignup) {
                await createUserWithEmailAndPassword(Auth, email, password);
                Swal.fire({
                    icon: 'success',
                    title: 'Cuenta creada!',
                    text: 'Tu cuenta ha sido creada correctamente!',
                });
                setView('signup');
            } else {
                await signInWithEmailAndPassword(Auth, email, password);
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido de vuelta!',
                    text: 'Has iniciado sesión correctamente!',
                });
                navigate("/Dashboard");
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
            });
        }
    }

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
    ];

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="card h-full">
            <div
                className="card-bg bg-blue-500"
                style={{ translate: isSignup ? 0 : "100%" }}
            />

            <Hero
                type="signup"
                active={isSignup}
                title="Welcome to Duro!"
                text="Sign up and discover our exclusive offers!"
                buttontext="Sign In"
                onClick={toggleView}
            />

            <AuthForm
                id="Registerform"
                type="signup"
                active={isSignup}
                title="Sign Up in to DURO!"
                text="Sign up and discover our exclusive offers!"
                onSubmit={handlesubmit}
            >
                {/* <Input type="text" name="documento" placeholder="Documento" required={true} id='documento'/>
                <select name="tipo_documento" className="p-[14px_25px] text-[#6b6b6b] focus:border-black focus:border-2 focus:text-black bg-white rounded-[10px] border border-[#ddd] outline-none hover:cursor-pointer" defaultValue="">
                    <option value="" disabled defaultChecked>Select document type</option>
                    <option value="tarjeta">Tarjeta de identidad</option>
                    <option value="cedula">Cedula de ciudadania</option>
                </select>
                <Input type="text" name="username" placeholder="Username" required={true} id='username' /> */}
                <Input type="email" name="email" placeholder="Email" required={true} id='email'/>
                <div className="flex flex-col gap-2 password-container">
                    <div className="flex items-center relative">
                        <Input type={showPassword ? "text" : "password"} id='password' placeholder="Create password" required={true} onChange={(e) => setPassword(e.target.value)} />
                        <div
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >{showPassword
                            ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24"><path stroke="black" d="M12 16.01a4 4 0 1 0 0-8 4 4 0 0 0 0 8" /><path stroke="black" d="M2 11.98c6.09-10.66 13.91-10.65 20 0m0 .03c-6.09 10.66-13.91 10.65-20 0" /></svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24"><path stroke="black" d="M14.83 9.18A4 4 0 0 0 8 12.01a4 4 0 0 0 1.16 2.82M12 16.01a4 4 0 0 0 4-4" /><path stroke="black" d="M17.61 6.39 6.38 17.62A21.8 21.8 0 0 1 2 11.99c4.71-8.23 10.44-10.1 15.61-5.6M21 3l-3.39 3.39M6.38 17.62 3 21M19.57 8.43A25.3 25.3 0 0 1 22 12.01c-4 7-8.73 9.39-13.23 7.22" /></svg>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col p-2 gap-1 bg-white border border-gray-300 rounded">
                        {
                            rules.map((rules, i) => (
                                <span key={i} className={`text-sm ${rules.condition ? 'text-green-500 before:content-["✓"]' : 'before:text-red-500 before:content-["✗"]'} before:mr-1`}>
                                    {rules.label}
                                </span>
                            ))
                        }
                    </div>
                </div>
                <button className="bg-blue-500">Sign Up</button>
            </AuthForm>

            <Hero
                type="signin"
                active={!isSignup}
                title="Welcome Back!"
                text="To keep connected with us please login with your personal info"
                buttontext="Sign Up"
                onClick={toggleView}
            />

            <AuthForm
                id="Loginform"
                type="signin"
                active={!isSignup}
                title="Sign In to DURO!"
                text="To keep connected with us please login with your personal info"
                onSubmit={handlesubmit}
            >
                <Input type="text" placeholder="Email or username" required={true} id='email' />
                <div className="flex items-center relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Password" required={true} id='password' />
                    <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                    >{showPassword
                        ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24"><path stroke="black" d="M12 16.01a4 4 0 1 0 0-8 4 4 0 0 0 0 8" /><path stroke="black" d="M2 11.98c6.09-10.66 13.91-10.65 20 0m0 .03c-6.09 10.66-13.91 10.65-20 0" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24"><path stroke="black" d="M14.83 9.18A4 4 0 0 0 8 12.01a4 4 0 0 0 1.16 2.82M12 16.01a4 4 0 0 0 4-4" /><path stroke="black" d="M17.61 6.39 6.38 17.62A21.8 21.8 0 0 1 2 11.99c4.71-8.23 10.44-10.1 15.61-5.6M21 3l-3.39 3.39M6.38 17.62 3 21M19.57 8.43A25.3 25.3 0 0 1 22 12.01c-4 7-8.73 9.39-13.23 7.22" /></svg>
                        }
                    </span>
                </div>
                <a className="cursor-pointer hover:">Forgot password?</a>
                <button className="bg-blue-500">Sign In</button>
            </AuthForm>
        </div>
    );
}

export default Login;