import { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import Icono from './Icono.jsx';

/**
 * Las solapas de una pantalla con varias partes, como el expediente de una
 * cirugía. Una opción con `href` es una visita que reemplaza a la anterior en
 * el historial: «Volver» sale de la pantalla, no recorre las solapas. Con
 * `onClick` cambia sólo lo que se muestra, sin visitar. En el celular van en
 * un renglón que se desliza de costado, con la activa a la vista.
 */
export default function Solapas({ opciones, actual, etiqueta, className = '' }) {
    const barra = useRef(null);

    // A mano y no con `scrollIntoView`, que también movería la página hacia arriba.
    useEffect(() => {
        const nav = barra.current;
        const activa = nav?.querySelector('[aria-current]');
        if (! activa || nav.scrollWidth <= nav.clientWidth) return;

        nav.scrollLeft = activa.offsetLeft - (nav.clientWidth - activa.offsetWidth) / 2;
    }, [actual]);

    return (
        <nav
            ref={barra}
            className={`relative flex gap-1 overflow-x-auto border-b border-brandText-soft/70 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible dark:border-gray-800 ${className}`}
            aria-label={etiqueta}
        >
            {opciones.map(({ clave, etiqueta: texto, icono = null, href = null, onClick = null }) => {
                const activa = actual === clave;
                const clases = `flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
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
