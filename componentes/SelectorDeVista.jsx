import { Link } from '@inertiajs/react';

/**
 * Opciones pegadas para ver lo mismo de otra forma: Mes / Semana / Día, Activos
 * / Todos. Recibe las mismas `opciones` que `Solapas`; con `href` visita, con
 * `onClick` cambia sin visitar.
 */
export default function SelectorDeVista({ opciones, actual, etiqueta, className = '' }) {
    return (
        <div
            className={`inline-flex shrink-0 rounded-xl border border-brandText-soft bg-white p-1 dark:border-gray-700 dark:bg-surface-dark ${className}`}
            role="group"
            aria-label={etiqueta}
        >
            {opciones.map(({ clave, etiqueta: texto, href = null, onClick = null }) => {
                const activa = actual === clave;
                const clases = `rounded-lg px-4 py-1.5 text-sm font-semibold transition duration-200 active:scale-95 ${
                    activa
                        ? 'bg-primary text-white'
                        : 'text-brandText-muted hover:text-primary dark:text-brandText-mutedDark dark:hover:text-gray-100'
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
