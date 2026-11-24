import { useState } from 'react';
import { Alerta, ApplicationLogo, Boton, Dato, Estado, Icono, MarcoPortal, SeccionesDelMenu, Tarjeta, institucional } from '../../componentes/index.js';
import { USUARIO, href } from '../datos.js';

const PACIENTE = { ...USUARIO, nombre: 'Lucía Fernández', email: 'lfernandez@correo.com', rolEtiqueta: 'Paciente' };

const SECCIONES = [
    { clave: 'inicio', etiqueta: 'Inicio', icono: 'home' },
    { clave: 'turnos', etiqueta: 'Mis turnos', icono: 'calendar_month' },
    { clave: 'estudios', etiqueta: 'Mis estudios', icono: 'lab_profile' },
    { clave: 'documentacion', etiqueta: 'Documentación', icono: 'folder_open' },
];

/** El portal de un sistema inventado, «Portal de Pacientes», para ver `MarcoPortal` en claro y en oscuro. */
export default function Paciente() {
    const [actual, setActual] = useState('inicio');
    const seccion = SECCIONES.find((item) => item.clave === actual);

    const pedirTurno = () => {};

    const navegacion = (
        <SeccionesDelMenu
            secciones={SECCIONES.map((item) => ({ ...item, activa: item.clave === actual, onClick: () => setActual(item.clave) }))}
            etiqueta="Secciones del portal"
            tamano="portal"
        />
    );

    const encabezado = (
        <div className="flex min-w-0 flex-1 items-center gap-4">
            <ApplicationLogo className="h-auto w-32 shrink-0 lg:hidden" />

            <nav aria-label="Dónde estás" className="hidden min-w-0 items-center gap-2 text-base text-brandText dark:text-brandText-dark lg:flex">
                <span className="inline-flex min-h-11 items-center">Portal de Pacientes</span>
                <Icono nombre="chevron_right" className="text-xl" />
                <span className="inline-flex min-h-11 items-center font-semibold text-primary dark:text-gray-100" aria-current="page">
                    {seccion.etiqueta}
                </span>
            </nav>
        </div>
    );

    const pie = (
        <div className="space-y-1 px-4 py-4 text-sm text-brandText dark:text-brandText-dark sm:px-5 lg:px-8">
            <p>
                Call Center: <span className="font-semibold">{institucional.telefono}</span> · {institucional.horarioCallCenter}
            </p>
            <p>{institucional.nombre} · {institucional.direccion}</p>
        </div>
    );

    return (
        <MarcoPortal
            titulo={seccion.etiqueta}
            usuario={{ nombre: PACIENTE.nombre, email: PACIENTE.email, rol: PACIENTE.rolEtiqueta }}
            enlaces={[{ etiqueta: 'Volver al catálogo', icono: 'arrow_back', href: href('inicio') }]}
            encabezado={encabezado}
            navegacion={navegacion}
            accion={{ etiqueta: 'Pedir turno', icono: 'add', onClick: pedirTurno }}
            barraInferior={
                <Boton tipo="button" onClick={pedirTurno} icono="add" className="w-full shadow-lg">
                    Pedir turno
                </Boton>
            }
            pie={pie}
            conTema
        >
            <div className="mx-auto max-w-3xl space-y-6">
                <h1 className="titulo-corto text-2xl text-primary dark:text-gray-100">Hola, Lucía</h1>

                <Alerta tipo="info" tamano="portal" titulo="Llevá tu DNI">
                    Presentate 15 minutos antes de tu turno en admisión, con tu documento y la orden médica.
                </Alerta>

                <Tarjeta titulo="Tu próximo turno" icono="event">
                    <div className="mb-4">
                        <Estado tono="exito" icono="check_circle">
                            Confirmado
                        </Estado>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Dato etiqueta="Especialidad" valor="Cardiología" />
                        <Dato etiqueta="Profesional" valor="Dr. Martín Ruiz" />
                        <Dato etiqueta="Día y hora" valor="martes 2 de diciembre, 10:30" />
                        <Dato etiqueta="Lugar" valor="Consultorios externos, planta baja" />
                    </div>
                </Tarjeta>
            </div>
        </MarcoPortal>
    );
}
