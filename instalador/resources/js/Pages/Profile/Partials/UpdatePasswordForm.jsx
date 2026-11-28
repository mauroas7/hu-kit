import { useForm } from '@inertiajs/react';
import { Boton, Campo, PasswordInput, Tarjeta, claseControl, descritoPor } from 'hu-kit/componentes';

const CAMPOS = [
    ['current_password', 'Contraseña actual', 'current-password'],
    ['password', 'Contraseña nueva', 'new-password'],
    ['password_confirmation', 'Repetí la contraseña nueva', 'new-password'],
];

export default function UpdatePasswordForm() {
    const { data, setData, put, errors, processing, recentlySuccessful, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const guardar = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => reset('password', 'password_confirmation', 'current_password'),
        });
    };

    return (
        <Tarjeta titulo="Contraseña">
            <form onSubmit={guardar} className="space-y-5">
                {CAMPOS.map(([id, etiqueta, autoComplete]) => (
                    <Campo key={id} id={id} etiqueta={etiqueta} error={errors[id]}>
                        <PasswordInput
                            id={id}
                            value={data[id]}
                            autoComplete={autoComplete}
                            className={claseControl(Boolean(errors[id]))}
                            aria-describedby={descritoPor(id, errors[id], null)}
                            onChange={(e) => setData(id, e.target.value)}
                        />
                    </Campo>
                ))}

                <div className="flex items-center gap-4">
                    <Boton disabled={processing}>Guardar</Boton>
                    {recentlySuccessful && <p className="text-sm text-brandText-muted dark:text-brandText-mutedDark">Guardado.</p>}
                </div>
            </form>
        </Tarjeta>
    );
}
