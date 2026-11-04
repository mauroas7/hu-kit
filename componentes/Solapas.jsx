import { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import Icono from './Icono.jsx';

/**
 * Las solapas de una pantalla con varias partes, como el expediente de una
 * cirugía. Una opción con `href` es una visita que reemplaza a la anterior en
 * el historial: «Volver» sale de la pantalla, no recorre las solapas. Con
 * `onClick` cambia sólo lo que se muestra, sin visitar. En el celular van en
 * un renglón que se desliza de costado, con la activa a la vista. `alFinal` es
 * lo que va a la derecha, sobre la misma raya: con él la fila no se parte en
 * renglones en ningún ancho, porque lo que va al final no puede quedar colgado
 * de un segundo renglón.
 */
export default function Solapas({ opciones, actual, etiqueta, alFinal = null, className = '' }) {
    const barra = useRef(null);

    // A mano y no con `scrollIntoView`, que también movería la página hacia arriba.
    useEffect(() => {
        const nav = barra.current;
        const activa = nav?.querySelector('[aria-current]');
        if (! activa || nav.scrollWidth <= nav.clientWidth) return;

        nav.scrollLeft = activa.offsetLeft - (nav.clientWidth - activa.offsetWidth) / 2;
    }, [actual]);

    const lista = opciones.map(({ clave, etiqueta: texto, icono = null, href = null, onClick = null }) => {
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
    });

    if (alFinal) {
        return (
            <div className={`flex items-end gap-3 border-b border-brandText-soft/70 dark:border-gray-800 ${className}`}>
                <nav
                    ref={barra}
                    className="relative flex min-w-0 flex-1 gap-1 self-end overflow-x-auto [scrollbar-width:none]"
                    aria-label={etiqueta}
                >
                    {lista}
                </nav>
                <div className="shrink-0 self-center py-1">{alFinal}</div>
            </div>
        );
    }

    return (
        <nav
            ref={barra}
            className={`relative flex gap-1 overflow-x-auto border-b border-brandText-soft/70 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible dark:border-gray-800 ${className}`}
            aria-label={etiqueta}
        >
            {lista}
        </nav>
    );
}
