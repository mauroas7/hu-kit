import { useForm } from '@inertiajs/react';
import { Boton, Campo, PanelAutenticacion, PasswordInput, claseControl, descritoPor } from 'hu-kit/componentes';
import { SISTEMA } from '@/sistema';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: '' });

    const confirmar = (e) => {
        e.preventDefault();
        post(route('password.confirm'), { onFinish: () => reset('password') });
    };

    return (
        <PanelAutenticacion
            tituloPestana="Confirmar contraseña"
            nombre={SISTEMA.nombre}
            bajada={SISTEMA.bajada}
            rotulo="Hospital Universitario"
            titulo="Confirmá tu contraseña"
            subtitulo="Es una zona segura: antes de seguir, volvé a escribirla."
        >
            <form onSubmit={confirmar} className="space-y-6">
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

                <Boton tamano="ingreso" className="w-full" disabled={processing}>
                    Confirmar
                </Boton>
            </form>
        </PanelAutenticacion>
    );
}
