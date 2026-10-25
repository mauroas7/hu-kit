import { usePage } from '@inertiajs/react';
import Alerta from './Alerta.jsx';

const TIPOS = ['exito', 'error', 'aviso', 'info'];
const URGENTES = ['error', 'aviso'];

/**
 * Los mensajes de un solo uso que dejó el controlador con `->with('exito', …)`.
 * El sistema los comparte en `flash` desde `HandleInertiaRequests::share()`,
 * así que cualquier página los tiene sin pedirlos.
 */
export default function Flash() {
    const { flash } = usePage().props;
    const tipos = TIPOS.filter((tipo) => flash?.[tipo]);
    const texto = (urgentes) => tipos.filter((tipo) => URGENTES.includes(tipo) === urgentes).map((tipo) => flash[tipo]).join(' ');

    // Un lector de pantalla anuncia lo que cambia en una región que ya estaba; una que
    // aparece ya escrita puede callarla. Por eso el anuncio va en dos regiones fijas y
    // las alertas, que llegan con el mensaje, quedan sólo a la vista.
    return (
        <>
            <p role="status" className="sr-only">{texto(false)}</p>
            <p role="alert" className="sr-only">{texto(true)}</p>

            {tipos.length > 0 && (
                <div aria-hidden="true">
                    {tipos.map((tipo) => (
                        <Alerta key={tipo} tipo={tipo} className="mb-4 animate-fade-in">
                            {flash[tipo]}
                        </Alerta>
                    ))}
                </div>
            )}
        </>
    );
}
