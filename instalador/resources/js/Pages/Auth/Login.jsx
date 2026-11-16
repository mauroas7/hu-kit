import { Link, useForm } from '@inertiajs/react';
import { Alerta, Boton, Campo, Checkbox, Input, PanelAutenticacion, PasswordInput, claseControl, descritoPor } from 'hu-kit/componentes';
import { SISTEMA } from '@/sistema';

const enlace = 'font-semibold text-secondary hover:underline dark:text-blue-300';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const ingresar = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <PanelAutenticacion
            tituloPestana="Ingresar"
            nombre={SISTEMA.nombre}
            bajada={SISTEMA.bajada}
            rotulo="Hospital Universitario"
            titulo="Iniciar sesión"
            subtitulo="Accedé con tu usuario del hospital."
        >
            {status && <Alerta tipo="exito" className="mb-6">{status}</Alerta>}

            <form onSubmit={ingresar} className="space-y-6">
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
                        autoComplete="current-password"
                        className={claseControl(Boolean(errors.password), 'ingreso')}
                        aria-describedby={descritoPor('password', errors.password, null)}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </Campo>

                <div className="flex items-center justify-between gap-4">
                    <Checkbox nombre="remember" etiqueta="Recordarme" valor={data.remember} onChange={(e) => setData('remember', e.target.checked)} />

                    {canResetPassword && (
                        <Link href={route('password.request')} className={`text-sm ${enlace}`}>
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

                <Boton tamano="ingreso" className="w-full" disabled={processing}>
                    Ingresar
                </Boton>

                <p className="text-center text-sm text-brandText dark:text-brandText-dark">
                    ¿No tenés cuenta?{' '}
                    <Link href={route('register')} className={enlace}>
                        Registrate
                    </Link>
                </p>
            </form>
        </PanelAutenticacion>
    );
}
