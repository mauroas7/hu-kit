import { Link, useForm, usePage } from '@inertiajs/react';
import { Alerta, Boton, Input, Tarjeta } from 'hu-kit/componentes';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status }) {
    const usuario = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: usuario.name,
        email: usuario.email,
    });

    const guardar = (e) => {
        e.preventDefault();
        patch(route('profile.update'), { preserveScroll: true });
    };

    return (
        <Tarjeta titulo="Datos de la cuenta" icono="person">
            <form onSubmit={guardar} className="space-y-5">
                <Input
                    nombre="name"
                    etiqueta="Nombre y apellido"
                    requerido
                    valor={data.name}
                    error={errors.name}
                    autoComplete="name"
                    onChange={(e) => setData('name', e.target.value)}
                />

                <Input
                    nombre="email"
                    etiqueta="Correo electrónico"
                    tipo="email"
                    requerido
                    valor={data.email}
                    error={errors.email}
                    autoComplete="username"
                    onChange={(e) => setData('email', e.target.value)}
                />

                {mustVerifyEmail && usuario.email_verified_at === null && (
                    <Alerta tipo="aviso">
                        Tu correo no está verificado.{' '}
                        <Link href={route('verification.send')} method="post" as="button" className="font-semibold underline">
                            Reenviar el enlace de verificación
                        </Link>
                        {status === 'verification-link-sent' && ' Te enviamos un nuevo enlace.'}
                    </Alerta>
                )}

                <div className="flex items-center gap-4">
                    <Boton disabled={processing}>Guardar</Boton>
                    {recentlySuccessful && <p className="text-sm text-brandText-muted dark:text-brandText-mutedDark">Guardado.</p>}
                </div>
            </form>
        </Tarjeta>
    );
}
