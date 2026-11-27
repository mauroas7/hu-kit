import { useForm } from '@inertiajs/react';
import { Boton, Campo, Input, PanelAutenticacion, PasswordInput, claseControl, descritoPor } from 'hu-kit/componentes';
import { SISTEMA } from '@/sistema';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const guardar = (e) => {
        e.preventDefault();
        post(route('password.store'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <PanelAutenticacion
            tituloPestana="Nueva contraseña"
            nombre={SISTEMA.nombre}
            bajada={SISTEMA.bajada}
            rotulo="Hospital Universitario"
            titulo="Nueva contraseña"
            subtitulo="Elegí la contraseña con la que vas a ingresar."
        >
            <form onSubmit={guardar} className="space-y-6">
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
                    Guardar contraseña
                </Boton>
            </form>
        </PanelAutenticacion>
    );
}
