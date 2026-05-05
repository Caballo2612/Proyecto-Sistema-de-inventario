import { getAuth, signOut } from "firebase/auth";
import appFireBase from "../credentials";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const Header = ({ IsOpen, toggleMenu, usuario, system, preferences }) => {

    const Auth = getAuth(appFireBase);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const result = await Swal.fire({
                title: "¿Cerrar sesión?",
                text: "¿Estás seguro de esta acción?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, cerrar sesión",
                cancelButtonText: "Cancelar"
            });

            if (result.isConfirmed) {
                await signOut(Auth);
                await Swal.fire({
                    title: "Sesión cerrada",
                    text: "Hasta pronto!",
                    showConfirmButton: false,
                    icon: "success",
                    timer: 1500
                });
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al cerrar sesión",
                icon: "error"
            });
        }
    };

    return (
        <div
            className='flex-row flex z-50'
            style={{
                color: preferences.customColor ?? preferences.theme.textColor,
            }}
        >
            <header className={`w-full flex items-center transition-all duration-300 ${IsOpen.header ? 'h-13 opacity-100' : 'h-0 opacity-0'}`}
                style={{
                    backgroundColor: preferences.theme.headerColor,
                }}
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id='menuIcon'
                        width="40"
                        height="40"
                        version="1.1"
                        onClick={() => toggleMenu('sidebar')}
                        fill="none"
                        viewBox="0 0 24 24"
                        className='cursor-pointer transition-all duration-300 hover:scale-110 ml-2'
                    >
                        <path stroke="#fff" d="M6 12h12M6 15.5h12m-12-7h12" />
                    </svg>
                </div>
                <div>
                    <span className='ml-4 hidden text-2xl md:block lg:block xl:block uppercase'>
                        {system.sysName || 'sistema de inventario'}
                    </span>
                </div>
                <div className='ml-auto mr-4 flex items-center gap-2 group cursor-pointer' onClick={() => toggleMenu('settings')}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 32 32"
                        fill="none">
                        <path
                            d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083m0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5"
                            stroke="#fff"
                            strokeWidth="2"
                        />
                    </svg>
                    <span>
                        {usuario ? usuario.nombre : 'usuario'}
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="#fff"
                        viewBox="0 0 32 32"
                        className={'transition-all duration-300 group-hover:scale-120' + (IsOpen.settings ? ' rotate-180' : '')}
                    >
                        <path d="m16.003 18.626 7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z" />
                    </svg>
                </div>

                <div
                    className={`absolute right-4 top-14 rounded-md shadow-lg w-46 z-10 p-2 inline-block transition-all duration-300 origin-top ${!IsOpen.settings ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'}`}
                    style={{backgroundColor: preferences.theme.sidebarColor}}
                >
                    <Link to="/Configuracion/personal" className='flex hover:bg-gray-700 p-2 cursor-pointer flex-row items-center gap-2 rounded-md transition-colors duration-200'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 28 28">
                            <path fill="#fff" d="M14 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12m4-6a4 4 0 1 1-8 0 4 4 0 0 1 8 0" />
                            <path fill="#fff" fillRule="evenodd" d="M0 13v2a3 3 0 0 0 2.678 2.983q.192.545.433 1.064a3 3 0 0 0 .182 4.045l1.414 1.414a3 3 0 0 0 3.963.247q.652.324 1.346.569A3 3 0 0 0 13 28h2a3 3 0 0 0 2.983-2.677q.63-.222 1.227-.51a3 3 0 0 0 3.884-.307l1.414-1.414a3 3 0 0 0 .307-3.884q.287-.596.51-1.226A3 3 0 0 0 28 15v-2a3 3 0 0 0-2.677-2.983 12 12 0 0 0-.569-1.348 3 3 0 0 0-.248-3.962l-1.414-1.414a3 3 0 0 0-4.043-.183 12 12 0 0 0-1.067-.434A3 3 0 0 0 14.999 0h-2a3 3 0 0 0-2.983 2.678 12 12 0 0 0-1.193.494 3 3 0 0 0-4.115.12L3.294 4.708a3 3 0 0 0-.121 4.115q-.279.581-.495 1.195A3 3 0 0 0 0 13M16 3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.383c0 .475-.337.88-.794 1.012a10 10 0 0 0-2.021.838c-.417.23-.94.182-1.277-.154l-.372-.372a1 1 0 0 0-1.414 0L4.708 6.12a1 1 0 0 0 0 1.414l.372.372c.336.336.384.86.155 1.277a10 10 0 0 0-.839 2.022c-.133.457-.537.794-1.013.794H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.383c.476 0 .88.336 1.013.793.194.666.454 1.304.775 1.905.221.415.17.931-.162 1.264l-.302.301a1 1 0 0 0 0 1.414l1.414 1.415a1 1 0 0 0 1.415 0l.243-.244c.34-.34.872-.385 1.29-.147.668.38 1.384.684 2.137.903.457.133.793.537.793 1.013V25a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.383c0-.475.337-.88.794-1.012a10 10 0 0 0 2.023-.84c.417-.229.941-.18 1.277.156l.171.17a1 1 0 0 0 1.414 0l1.415-1.414a1 1 0 0 0 0-1.414l-.171-.17c-.337-.337-.384-.861-.155-1.278.35-.635.632-1.312.838-2.022.133-.457.537-.793 1.013-.793H25a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-.382c-.476 0-.88-.337-1.013-.794a10 10 0 0 0-.903-2.138c-.238-.419-.193-.95.147-1.29l.243-.243a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.415 0l-.3.3c-.333.333-.85.384-1.264.163a10 10 0 0 0-1.906-.775c-.457-.133-.794-.537-.794-1.013z" />
                        </svg>
                        <span>
                            Configuración
                        </span>
                    </Link>
                    <div className="border-t border-gray-700 my-1" style={{ borderColor: preferences.theme.headerColor }}></div>
                    <div onClick={handleLogout} className='flex hover:bg-gray-700 p-2 cursor-pointer flex-row items-center gap-2 rounded-md transition-colors duration-200'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#fff"
                            viewBox="0 0 16 16">
                            <path d="M1.3 3.75h5.88V2.5H1.3A1.25 1.25 0 0 0 .05 3.75v8.5A1.25 1.25 0 0 0 1.3 13.5h5.88v-1.25H1.3z" />
                            <path d="m15.4 7-4-2.74-.71 1 3.08 2.1H4.71v1.26h9.07l-3.08 2.11.71 1L15.4 9a1.24 1.24 0 0 0 0-2" />
                        </svg>
                        <span>
                            Cerrar Sesión
                        </span>
                    </div>
                </div>
            </header>
        </div>
    )
}
