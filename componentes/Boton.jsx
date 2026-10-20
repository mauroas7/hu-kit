import { Link } from '@inertiajs/react';
import Icono from './Icono.jsx';

/*
 * Los dos redondeos del manual de marca:
 *
 *   'confirmacion' → rounded-full. Envía un formulario o cierra una acción.
 *   'grupo'        → rounded-xl. Navega, selecciona o alterna.
 */
const FORMAS = {
    confirmacion: 'rounded-full',
    grupo: 'rounded-xl',
};

/*
 * Todas las variantes llevan borde, transparente si no se ve: así un botón
 * mide lo mismo que un campo de formulario y se alinea con él en la fila.
 * Las de peligro y éxito traen su color también para el modo oscuro.
 */
const VARIANTES = {
    primario: 'border-transparent bg-primary text-white hover:bg-primary-light',
    secundario: 'border-transparent bg-secondary text-primary hover:bg-secondary-light',
    exito: 'border-transparent bg-emerald-700 text-white hover:bg-emerald-800',
    contorno:
        'border-primary text-primary hover:bg-primary-faint dark:border-gray-600 dark:text-gray-100 dark:hover:bg-white/5',
    contornoPeligro:
        'border-red-700 text-red-700 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950/40',
    contornoExito:
        'border-emerald-700 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/40',
    fantasma:
        'border-transparent text-brandText hover:bg-brandText-soft/50 dark:text-brandText-dark dark:hover:bg-white/5',
    fantasmaPeligro:
        'border-transparent text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40',
    fantasmaExito:
        'border-transparent text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40',
    peligro: 'border-transparent bg-red-700 text-white hover:bg-red-800',
};

/*
 * El tamaño se elige con la prop y no con `className`: una clase de padding
 * que llega de afuera pierde contra la de acá según el orden del CSS. Cada
 * tamaño trae su peso y su ícono con el mismo alto de renglón que el texto.
 * `tactil` tiene 44 px de alto mínimo; `ingreso`, los 52 px del login del
 * portal contando el borde.
 */
const TAMANOS = {
    normal: ['px-5 py-2.5 text-sm font-semibold', 'text-lg leading-5'],
    tactil: ['min-h-11 px-5 py-2.5 text-sm font-semibold', 'text-lg leading-5'],
    compacto: ['px-3 py-1 text-xs font-semibold', 'text-base leading-4'],
    icono: ['p-2.5 text-sm font-semibold', 'text-lg leading-5'],
    iconoCompacto: ['p-1 text-xs font-semibold', 'text-base leading-4'],
    ingreso: [
        'px-5 py-[15px] text-sm font-black uppercase tracking-[0.15em] shadow-lg shadow-primary/20',
        'text-lg leading-5',
    ],
};

// `relative` encierra a los `sr-only` de adentro: sin él, dentro de una tabla
// con scroll se escapan del contenedor y ensanchan la página.
const BASE =
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap border transition duration-200 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100';

export default function Boton({
    variante = 'primario',
    forma = 'confirmacion',
    tamano = 'normal',
    href = null,
    externo = false,
    tipo = 'submit',
    icono = null,
    className = '',
    children,
    ...props
}) {
    const [claseTamano, claseIcono] = TAMANOS[tamano] ?? TAMANOS.normal;
    const clases = `${BASE} ${claseTamano} ${FORMAS[forma] ?? FORMAS.confirmacion} ${VARIANTES[variante] ?? VARIANTES.primario} ${className}`;

    const contenido = (
        <>
            {icono && <Icono nombre={icono} className={claseIcono} />}
            {children}
        </>
    );

    // `externo` es para lo que no es una página de Inertia, como la descarga
    // de un archivo: por `<Link>`, el cliente corta con el modal de error.
    if (href && externo) {
        return (
            <a href={href} className={clases} {...props}>
                {contenido}
            </a>
        );
    }

    // Un enlace de navegación va por <Link>: sin eso, Inertia pierde el
    // historial y cada click recarga la aplicación entera.
    if (href) {
        return (
            <Link href={href} className={clases} {...props}>
                {contenido}
            </Link>
        );
    }

    return (
        <button type={tipo} className={clases} {...props}>
            {contenido}
        </button>
    );
}
