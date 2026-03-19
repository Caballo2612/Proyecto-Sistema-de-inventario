import React, { useEffect } from 'react'
import CompanyConfig from './views/CompanyConfig';
import PersonalConfig from './views/PersonalConfig';
import SiteConfig from './views/SiteConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Config = ({ usuario, firestore }) => {

    const sections = [
        {
            id: "site",
            buttonName: "Diseño del sitio web",
            SectionName: "Configuracion Del Sitio",
            title: "Site Design",
            component: SiteConfig,
            permission: "all",
        },
        {
            id: "company",
            buttonName: "Diseño de Empresa",
            SectionName: "Configuracion De La Pagina",
            title: "Configuracion De Empresa",
            component: CompanyConfig,
            permission: "Admin",
        },
        {
            id: "personal",
            buttonName: "Configuracion Personal",
            SectionName: "Configuracion De Datos",
            title: "Configuracion De Datos",
            component: PersonalConfig,
            permission: "all",
        },
    ];

    const navigate = useNavigate();

    const { section } = useParams();

    const activeSectionData = sections.find(s => s.id === section);

    const ActiveComponent = activeSectionData?.component;

    const canAccess =
        activeSectionData.permission === "all" ||
        usuario?.rol === activeSectionData.permission;

    useEffect(() => {
        if (activeSectionData && !canAccess) {
            Swal.fire({
                icon: "error",
                title: "Acceso denegado",
                text: "No puedes acceder a esta seccion",
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                navigate("/Configuracion/personal")
            });
        }
    }, [activeSectionData, canAccess, navigate]);

    if (!canAccess) {
        return null
    };

    return (
        <div className="flex flex-col xl:flex-row md:flex-row lg:flex-row h-full">

            <div className="flex flex-col gap-3 xl:gap-0 lg:gap-0 md:gap-0 bg-gray-300/50 p-4 pr-15 min-h-full">

                {sections.filter(sec => sec.permission === "all" || usuario?.rol === sec.permission)
                    .map(section => (
                        <div key={section.id}>
                            <h1 className='text-gray-600 text-[17px] hidden lg:block md:block xl:block px-2 py-3'>
                                {section.SectionName}
                            </h1>
                            <button
                                onClick={() => navigate(`/Configuracion/${section.id}`)}
                                className={`py-1 px-2 rounded-xl text-sm cursor-pointer
                            ${section?.id === activeSectionData?.id
                                        ? "bg-gray-500 text-gray-100"
                                        : "text-gray-600 hover:bg-gray-200"}
                            `}
                            >
                                {section.buttonName}
                            </button>
                        </div>
                    ))}

            </div>

            <div className='flex flex-col flex-1'>
                <div className="bg-gray-300/50 text-gray-800 text-xl py-4 px-5">
                    {activeSectionData.title}
                </div>

                <div className="flex-1 rounded-lg p-5 m-2 bg-gray-200">
                    <ActiveComponent usuario={usuario} firestore={firestore} />
                </div>
            </div>

        </div>
    )
}

export default Config