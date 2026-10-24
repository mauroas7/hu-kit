import { Link } from '@inertiajs/react';
import { Boton, Campo, Checkbox, Input, PanelAutenticacion, PasswordInput, claseControl, descritoPor } from '../../componentes/index.js';
import { href } from '../datos.js';

export default function Ingreso() {
    return (
        <PanelAutenticacion
            tituloPestana="Ingresar"
            nombre={
                <>
                    Pedidos
                    <br />
                    HU
                </>
            }
            bajada="Un sistema de ejemplo, armado sólo con piezas de hu-kit."
            rotulo="Hospital Universitario"
            titulo="Iniciar sesión"
            subtitulo="Accedé con tu usuario del hospital."
        >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <Input nombre="email" etiqueta="Correo electrónico" tipo="email" variante="ingreso" valor="" onChange={() => {}} placeholder="nombre@hospital.uncu.edu.ar" />

                <Campo id="password" etiqueta="Contraseña" variante="ingreso">
                    <PasswordInput id="password" variante="ingreso" className={claseControl(false, 'ingreso')} aria-describedby={descritoPor('password', null, null)} />
                </Campo>

                <div className="flex items-center justify-between gap-3">
                    <Checkbox nombre="recordar" etiqueta="Recordarme" valor={false} onChange={() => {}} />
                    <Link href={href('inicio')} className="text-sm font-semibold text-secondary-dark hover:underline">
                        Volver al catálogo
                    </Link>
                </div>

                <Boton tamano="ingreso" className="w-full">
                    Ingresar
                </Boton>
            </form>
        </PanelAutenticacion>
    );
}
