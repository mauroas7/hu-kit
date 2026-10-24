import { Link } from '@inertiajs/react';
import Icono from './Icono.jsx';

/**
 * Las solapas de una pantalla con varias partes, como el expediente de una
 * cirugía. Una opción con `href` es una visita que reemplaza a la anterior en
 * el historial: «Volver» sale de la pantalla, no recorre las solapas. Con
 * `onClick` cambia sólo lo que se muestra, sin visitar.
 */
export default function Solapas({ opciones, actual, etiqueta, className = '' }) {
    return (
        <nav className={`flex flex-wrap gap-1 border-b border-brandText-soft/70 dark:border-gray-800 ${className}`} aria-label={etiqueta}>
            {opciones.map(({ clave, etiqueta: texto, icono = null, href = null, onClick = null }) => {
                const activa = actual === clave;
                const clases = `flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                    activa
                        ? 'border-secondary text-primary dark:text-gray-100'
                        : 'border-transparent text-brandText-muted hover:text-primary dark:text-brandText-mutedDark dark:hover:text-gray-200'
                }`;
                const contenido = (
                    <>
                        {icono && <Icono nombre={icono} className="text-lg" relleno={activa} />}
                        {texto}
                    </>
                );

                return href ? (
                    <Link key={clave} href={href} replace preserveScroll aria-current={activa ? 'page' : undefined} className={clases}>
                        {contenido}
                    </Link>
                ) : (
                    <button key={clave} type="button" onClick={onClick} aria-current={activa ? 'true' : undefined} className={clases}>
                        {contenido}
                    </button>
                );
            })}
        </nav>
    );
}
