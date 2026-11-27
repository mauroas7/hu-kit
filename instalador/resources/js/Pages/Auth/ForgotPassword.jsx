import { Link, useForm } from '@inertiajs/react';
import { Alerta, Boton, Input, PanelAutenticacion } from 'hu-kit/componentes';
import { SISTEMA } from '@/sistema';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const enviar = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <PanelAutenticacion
            tituloPestana="Recuperar contraseña"
            nombre={SISTEMA.nombre}
            bajada={SISTEMA.bajada}
            rotulo="Hospital Universitario"
            titulo="Recuperar contraseña"
            subtitulo="Te enviamos por correo un enlace para elegir una nueva."
        >
            {status && <Alerta tipo="exito" className="mb-6">{status}</Alerta>}

            <form onSubmit={enviar} className="space-y-6">
                <Input
                    nombre="email"
                    etiqueta="Correo electrónico"
                    tipo="email"
                    variante="ingreso"
                    valor={data.email}
                    error={errors.email}
                    autoComplete="username"
                    onChange={(e) => setData('email', e.target.value)}
                />

                <Boton tamano="ingreso" className="w-full" disabled={processing}>
                    Enviar enlace
                </Boton>

                <p className="text-center text-sm text-brandText dark:text-brandText-dark">
                    <Link href={route('login')} className="font-semibold text-secondary hover:underline dark:text-blue-300">
                        Volver a ingresar
                    </Link>
                </p>
            </form>
        </PanelAutenticacion>
    );
}
