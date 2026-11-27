import { useForm } from '@inertiajs/react';
import { Boton, Campo, ModalConfirmar, PasswordInput, Tarjeta, claseControl, descritoPor, useConfirmacion } from 'hu-kit/componentes';

export default function DeleteUserForm() {
    const { data, setData, delete: eliminar, errors, reset } = useForm({ password: '' });
    const { confirmar, props } = useConfirmacion();

    const pedirConfirmacion = (e) => {
        e.preventDefault();
        confirmar({
            titulo: '¿Eliminar tu cuenta?',
            detalle: 'Se borra tu cuenta con todos sus datos y no se puede deshacer.',
            textoAceptar: 'Eliminar cuenta',
            accion: () => eliminar(route('profile.destroy'), { preserveScroll: true, onFinish: () => reset('password') }),
        });
    };

    return (
        <Tarjeta titulo="Eliminar la cuenta" icono="delete">
            <form onSubmit={pedirConfirmacion} className="space-y-5">
                <p className="text-sm text-brandText-muted dark:text-brandText-mutedDark">
                    Al eliminarla se borran todos sus datos. Para confirmar que sos vos, escribí tu contraseña.
                </p>

                <Campo id="password" etiqueta="Contraseña" error={errors.password}>
                    <PasswordInput
                        id="password"
                        value={data.password}
                        autoComplete="current-password"
                        className={claseControl(Boolean(errors.password))}
                        aria-describedby={descritoPor('password', errors.password, null)}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </Campo>

                <Boton variante="contornoPeligro">Eliminar cuenta</Boton>
            </form>

            <ModalConfirmar {...props} />
        </Tarjeta>
    );
}
