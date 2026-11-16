import { Link, useForm } from '@inertiajs/react';
import { Boton, Campo, Input, PanelAutenticacion, PasswordInput, claseControl, descritoPor } from 'hu-kit/componentes';
import { SISTEMA } from '@/sistema';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const registrar = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <PanelAutenticacion
            tituloPestana="Registrarse"
            nombre={SISTEMA.nombre}
            bajada={SISTEMA.bajada}
            rotulo="Hospital Universitario"
            titulo="Crear cuenta"
            subtitulo="Completá tus datos para empezar."
        >
            <form onSubmit={registrar} className="space-y-6">
                <Input
                    nombre="name"
                    etiqueta="Nombre y apellido"
                    variante="ingreso"
                    valor={data.name}
                    error={errors.name}
                    autoComplete="name"
                    onChange={(e) => setData('name', e.target.value)}
                />

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

                <Campo id="password" etiqueta="Contraseña" variante="ingreso" error={errors.password}>
                    <PasswordInput
                        id="password"
                        variante="ingreso"
                        value={data.password}
                        autoComplete="new-password"
                        className={claseControl(Boolean(errors.password), 'ingreso')}
                        aria-describedby={descritoPor('password', errors.password, null)}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </Campo>

                <Campo id="password_confirmation" etiqueta="Repetí la contraseña" variante="ingreso" error={errors.password_confirmation}>
                    <PasswordInput
                        id="password_confirmation"
                        variante="ingreso"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        className={claseControl(Boolean(errors.password_confirmation), 'ingreso')}
                        aria-describedby={descritoPor('password_confirmation', errors.password_confirmation, null)}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                </Campo>

                <Boton tamano="ingreso" className="w-full" disabled={processing}>
                    Crear cuenta
                </Boton>

                <p className="text-center text-sm text-brandText dark:text-brandText-dark">
                    ¿Ya tenés cuenta?{' '}
                    <Link href={route('login')} className="font-semibold text-secondary hover:underline dark:text-blue-300">
                        Ingresá
                    </Link>
                </p>
            </form>
        </PanelAutenticacion>
    );
}
