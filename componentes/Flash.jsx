import { usePage } from '@inertiajs/react';
import Alerta from './Alerta.jsx';

const TIPOS = ['exito', 'error', 'aviso', 'info'];

/**
 * Los mensajes de un solo uso que dejó el controlador con `->with('exito', …)`.
 * El sistema los comparte en `flash` desde `HandleInertiaRequests::share()`,
 * así que cualquier página los tiene sin pedirlos.
 */
export default function Flash() {
    const { flash } = usePage().props;

    if (! flash) return null;

    return TIPOS.filter((tipo) => flash[tipo]).map((tipo) => (
        <Alerta key={tipo} tipo={tipo} className="mb-4 animate-fade-in">
            {flash[tipo]}
        </Alerta>
    ));
}
