import { Link } from '@inertiajs/react';

/**
 * Opciones pegadas para ver lo mismo de otra forma: Mes / Semana / Día, Activos
 * / Todos. Recibe las mismas `opciones` que `Solapas`; con `href` visita, con
 * `onClick` cambia sin visitar.
 */
export default function SelectorDeVista({ opciones, actual, etiqueta, className = '' }) {
    return (
        <div
            className={`inline-flex w-full shrink-0 rounded-xl border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-surface-dark sm:w-auto ${className}`}
            role="group"
            aria-label={etiqueta}
        >
            {opciones.map(({ clave, etiqueta: texto, href = null, onClick = null }) => {
                const activa = actual === clave;
                const clases = `flex min-h-11 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-3 text-xs font-semibold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
                    activa
                        ? 'bg-primary text-white dark:bg-white dark:text-primary'
                        : 'text-brandText hover:bg-canvas dark:text-brandText-dark dark:hover:bg-white/5'
                }`;

                return href ? (
                    <Link key={clave} href={href} aria-current={activa ? 'page' : undefined} className={clases}>
                        {texto}
                    </Link>
                ) : (
                    <button key={clave} type="button" onClick={onClick} aria-pressed={activa} className={clases}>
                        {texto}
                    </button>
                );
            })}
        </div>
    );
}
