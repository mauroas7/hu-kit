import Icono from './Icono.jsx';

/*
 * 'normal' es la de todo formulario: su alto es el token `etiqueta` del preset,
 * y si cambia el renglón o la separación, cambia allá. 'ingreso' es la del
 * panel de autenticación, igual a la del login del portal de pacientes.
 */
const VARIANTES = {
    normal: {
        caja: 'space-y-1.5',
        etiqueta: 'text-sm font-semibold text-primary dark:text-gray-100',
    },
    ingreso: {
        caja: 'space-y-2',
        etiqueta: 'text-[11px] font-black uppercase tracking-widest text-brandText dark:text-brandText-dark',
    },
};

/** La etiqueta, la ayuda y el error que rodean a todo campo de formulario; el control lo pone quien lo usa. */
export default function Campo({
    id,
    etiqueta = null,
    ayuda = null,
    error = null,
    requerido = false,
    variante = 'normal',
    children,
}) {
    const clases = VARIANTES[variante] ?? VARIANTES.normal;

    return (
        <div className={clases.caja}>
            {etiqueta && (
                <label htmlFor={id} className={`block ${clases.etiqueta}`}>
                    {etiqueta}
                    {requerido && (
                        <span className="text-red-700 dark:text-red-400" aria-hidden="true">
                            {' '}
                            *
                        </span>
                    )}
                </label>
            )}

            {children}

            {ayuda && !error && <p id={`${id}-ayuda`} className="text-xs text-brandText-muted dark:text-brandText-mutedDark">{ayuda}</p>}

            {error && (
                <p id={`${id}-error`} className="flex items-start gap-1 text-xs font-semibold text-red-700 dark:text-red-400">
                    <Icono nombre="error" className="shrink-0 text-sm leading-4" relleno />
                    {error}
                </p>
            )}
        </div>
    );
}

/** El `aria-describedby` del control: el error si lo hay y, si no, la ayuda, que `Campo` muestra de a uno. */
export function descritoPor(id, error, ayuda) {
    if (error) return `${id}-error`;

    return ayuda ? `${id}-ayuda` : undefined;
}

/**
 * La clase del control en sí, compartida por input, select y textarea. En
 * oscuro, `color-scheme` hace que el navegador pinte también lo suyo: el ícono
 * de calendario de un campo de fecha o la lista desplegada de un select.
 */
export function claseControl(hayError, variante = 'normal') {
    if (variante === 'ingreso') {
        return [
            'block w-full rounded-xl border bg-gray-50 px-4 py-3.5 text-sm font-semibold text-primary',
            'placeholder:text-gray-400 transition duration-300 focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10',
            'dark:bg-canvas-dark dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-surface-dark dark:[color-scheme:dark]',
            hayError ? 'border-red-600' : 'border-gray-200 dark:border-gray-700',
        ].join(' ');
    }

    return [
        'block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-brandText',
        'placeholder:text-brandText-muted focus:border-primary focus:ring-0',
        'dark:bg-canvas-dark dark:text-gray-100 dark:placeholder:text-brandText-mutedDark dark:focus:border-secondary dark:[color-scheme:dark]',
        hayError ? 'border-red-600' : 'border-brandText-soft dark:border-gray-700',
    ].join(' ');
}
