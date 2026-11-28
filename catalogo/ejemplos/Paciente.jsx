import { useState } from 'react';
import { Alerta, Boton, Dato, Estado, MarcoPortal, Rotulo, SeccionesDelMenu, Tarjeta, institucional } from '../../componentes/index.js';
import { USUARIO, href } from '../datos.js';

const PACIENTE = { ...USUARIO, nombre: 'Lucía Fernández', email: 'lfernandez@correo.com' };

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
            secciones={[
                ...SECCIONES.map((item, indice) => ({
                    ...item,
                    titulo: indice === 0 ? 'Tu atención' : undefined,
                    activa: item.clave === actual,
                    onClick: () => setActual(item.clave),
                })),
                { etiqueta: 'Cirugías', icono: 'healing', href: '#', externo: 'QuirofanoHU' },
            ]}
            etiqueta="Secciones del portal"
            tamano="portal"
        />
    );

    const migas = [{ etiqueta: 'Inicio', onClick: () => setActual('inicio') }, ...(actual === 'inicio' ? [] : [{ etiqueta: seccion.etiqueta }])];

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
            usuario={{ nombre: PACIENTE.nombre, email: PACIENTE.email, detalle: 'DNI 30.123.456' }}
            enlaces={[{ etiqueta: 'Volver al catálogo', icono: 'arrow_back', href: href('inicio') }]}
            migas={migas}
            navegacion={navegacion}
            accion={{ etiqueta: 'Nuevo turno', icono: 'calendar_add_on', onClick: pedirTurno }}
            barraInferior={
                <Boton
                    tipo="button"
                    variante="secundario"
                    forma="grupo"
                    tamano="tactil"
                    onClick={pedirTurno}
                    icono="calendar_add_on"
                    className="w-full shadow-lg"
                >
                    Nuevo turno
                </Boton>
            }
            lateral={
                actual === 'inicio' && (
                    <aside className="hidden w-80 shrink-0 border-l border-gray-100 bg-white px-5 pb-5 pt-8 dark:border-gray-800 dark:bg-surface-dark xl:block">
                        <Rotulo como="h2" className="mb-4 px-1">
                            Novedades
                        </Rotulo>
                        <p className="px-1 text-sm text-brandText dark:text-brandText-dark">
                            La columna `lateral`: a todo el alto del contenido, desde 1280 px.
                        </p>
                    </aside>
                )
            }
            pie={pie}
            conTema
        >
            <div className="mx-auto max-w-3xl space-y-6">
                <h1 className="titulo-corto text-2xl text-primary dark:text-gray-100">Hola, Lucía</h1>

                <Alerta tipo="info" tamano="portal" titulo="Llevá tu DNI">
                    Presentate 15 minutos antes de tu turno en admisión, con tu documento y la orden médica.
                </Alerta>

                <Tarjeta titulo="Tu próximo turno">
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
