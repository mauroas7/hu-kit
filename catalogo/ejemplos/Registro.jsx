import { Link } from '@inertiajs/react';
import { Alerta, Boton, Icono, Input, PanelAutenticacion } from '../../componentes/index.js';
import { href } from '../datos.js';

const CORREO = 'j***@hospital.uncu.edu.ar';

const IniciaSesion = () => (
    <p className="mt-8 text-center text-xs font-semibold text-brandText">
        ¿Ya tenés cuenta?{' '}
        <Link href={href('ingreso')} className="inline-flex min-h-11 items-center font-semibold text-secondary-dark hover:underline">
            Iniciá sesión
        </Link>
    </p>
);

function Documento({ sinHistoria }) {
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-end gap-3">
                <div className="flex-1">
                    <Input nombre="documento" etiqueta="Número de documento" variante="ingreso" valor="99999999" onChange={() => {}} />
                </div>
                <Boton tamano="ingreso" icono="search">
                    Buscar
                </Boton>
            </form>

            {sinHistoria && (
                <Alerta tipo="aviso" titulo="Historia clínica no vinculada" className="mt-4">
                    El documento ingresado no figura en la base del Hospital Universitario.
                    <br />
                    <Link href={href('registro')} className="inline-flex items-center gap-1 font-semibold underline">
                        <Icono nombre="person_add" className="text-lg" />
                        Registrarme en el hospital
                    </Link>
                </Alerta>
            )}

            <IniciaSesion />
        </>
    );
}

function Confirmar() {
    return (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <Alerta tipo="info">
                <p>Te enviaremos un correo de verificación a la casilla registrada en tu historia clínica:</p>
                <p className="my-1 font-black">{CORREO}</p>
                <p className="text-xs">Si no reconocés esa dirección, comunicate con el hospital para actualizar tus datos de contacto.</p>
            </Alerta>

            <Boton tamano="ingreso" className="w-full">
                Enviar correo
            </Boton>

            <Link href={href('registro')} className="flex min-h-11 items-center justify-center gap-2 text-xs font-semibold text-secondary-dark hover:underline">
                <Icono nombre="arrow_back" className="text-base" />
                Volver a verificar el documento
            </Link>
        </form>
    );
}

function Revisa() {
    return (
        <>
            <Alerta tipo="info">
                <p>
                    Te enviamos un correo a <span className="font-black">{CORREO}</span>.
                </p>
                <p className="mt-1 text-xs">
                    El enlace confirma tu identidad y ahí elegís tu contraseña. Si no fuiste vos quien pidió esta cuenta, no hagas clic y avisá al hospital.
                </p>
            </Alerta>

            <IniciaSesion />
        </>
    );
}

const PASOS = {
    1: { titulo: 'Verificá tu documento', subtitulo: 'Buscamos tu historia clínica para vincularla con tu cuenta.' },
    2: { titulo: 'Confirmá tu correo', subtitulo: 'Encontramos tus datos. Para activar tu cuenta, necesitamos verificar tu identidad.' },
    3: { titulo: 'Revisá tu correo', subtitulo: 'Te enviamos el enlace para elegir tu contraseña.' },
};

/** El registro de un paciente en tres pantallas; `?paso=1|2|3` elige cuál, y `&resultado=sin-historia` muestra la alerta del paso 1. */
export default function Registro() {
    const parametros = new URLSearchParams(window.location.search);
    const paso = PASOS[parametros.get('paso')] ? Number(parametros.get('paso')) : 1;

    return (
        <PanelAutenticacion
            tituloPestana="Crear cuenta"
            nombre={
                <>
                    Creá
                    <br />
                    tu cuenta
                </>
            }
            bajada="Verificamos tu documento y te enviamos un correo para que elijas tu contraseña."
            rotulo="Hospital Universitario"
            titulo={PASOS[paso].titulo}
            subtitulo={PASOS[paso].subtitulo}
        >
            {paso === 1 && <Documento sinHistoria={parametros.get('resultado') === 'sin-historia'} />}
            {paso === 2 && <Confirmar />}
            {paso === 3 && <Revisa />}
        </PanelAutenticacion>
    );
}
