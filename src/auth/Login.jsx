import Input from "../components/molecules/Input";
import appFireBase from "../credentials";
import '../components/stylesheets/extra.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../components/organisms/AuthForm";
import Hero from "../components/organisms/Hero";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Auth = getAuth(appFireBase);

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await signInWithEmailAndPassword(Auth, email, password);
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido de vuelta!',
                text: 'Has iniciado sesión correctamente!',
            });
            navigate("/");
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
            });
        }
    };

    return (
        <div className="card h-full">
            <div className="card-bg bg-blue-500 rounded-bl-[340px] rounded-tl-[340px]" />

            <Hero
                title="Bienvenido Al Sistema De Inventario!"
                text="To keep connected with us please login with your personal info"
                showSSO
                buttontext="Sign Up"
            />

            <AuthForm
                id="Loginform"
                title="Inicia Sesión!"
                text="To keep connected with us please login with your personal info"
                onSubmit={handleSubmit}
            >
                <Input type="text" placeholder="Email" required={true} name="email" id="email" />
                <Input type="password" placeholder="Password" name="password" required={true} id="password" />
                <a className="cursor-pointer">Olvidaste tu contraseña?</a>
                <button className="bg-blue-500">Iniciar Sesión</button>
            </AuthForm>
        </div>
    );
};

export default Login;