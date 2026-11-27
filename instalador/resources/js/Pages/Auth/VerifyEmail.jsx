import { Link, useForm } from '@inertiajs/react';
import { Alerta, Boton, PanelAutenticacion } from 'hu-kit/componentes';
import { SISTEMA } from '@/sistema';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const reenviar = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <PanelAutenticacion
            tituloPestana="Verificar correo"
            nombre={SISTEMA.nombre}
            bajada={SISTEMA.bajada}
            rotulo="Hospital Universitario"
            titulo="Verificá tu correo"
            subtitulo="Te enviamos un enlace: abrilo para activar tu cuenta."
        >
            {status === 'verification-link-sent' && (
                <Alerta tipo="exito" className="mb-6">
                    Te enviamos un nuevo enlace de verificación al correo con el que te registraste.
                </Alerta>
            )}

            <form onSubmit={reenviar} className="space-y-6">
                <Boton tamano="ingreso" className="w-full" disabled={processing}>
                    Reenviar el enlace
                </Boton>

                <p className="text-center text-sm">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="font-semibold text-secondary hover:underline dark:text-blue-300"
                    >
                        Cerrar sesión
                    </Link>
                </p>
            </form>
        </PanelAutenticacion>
    );
}
