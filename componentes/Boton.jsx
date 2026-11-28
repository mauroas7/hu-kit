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
    // En oscuro el azul casi no se separa de `surface-dark`: el borde lo dibuja.
    primario: 'border-transparent bg-primary text-white hover:bg-primary-light dark:border-white/15',
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
    suave:
        'border-gray-200 bg-canvas text-primary hover:bg-gray-100 dark:border-gray-700 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10',
    // La acción secundaria sobre un fondo `primary`. Sin `dark:`: el fondo ya es oscuro.
    contornoSobrePrimario: 'border-white/40 bg-white/10 text-white hover:bg-white/20',
};

// Las que van sobre un fondo `primary`: el aire del anillo de foco toma ese color.
const SOBRE_PRIMARIO = ['secundario', 'contornoSobrePrimario'];

/*
 * El tamaño va en la prop y no en `className`: un padding que llega de afuera
 * pierde contra el de acá según el orden del CSS. Cada tamaño trae su peso y su
 * ícono con el alto de renglón del texto. `tactil` mide 44 px de alto mínimo e
 * `icono`, 44 × 44; `ingreso`, los 52 px del login del portal con el borde.
 */
const TAMANOS = {
    normal: ['px-5 py-2.5 text-sm font-semibold', 'text-lg leading-5'],
    tactil: ['min-h-11 px-5 py-2.5 text-sm font-semibold', 'text-lg leading-5'],
    compacto: ['px-3 py-1 text-xs font-semibold', 'text-base leading-4'],
    icono: ['size-11 text-sm font-semibold', 'text-[22px] leading-none'],
    iconoCompacto: ['p-1 text-xs font-semibold', 'text-base leading-4'],
    ingreso: [
        'px-5 py-[15px] text-sm font-black uppercase tracking-[0.15em] shadow-lg shadow-primary/20',
        'text-lg leading-5',
    ],
};

// `relative` encierra a los `sr-only` de adentro: sin él, dentro de una tabla
// con scroll se escapan del contenedor y ensanchan la página. El anillo de foco
// reemplaza al contorno de `estilos.css`.
const BASE =
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap border transition-colors duration-150 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100';

/** Las clases de un `Boton`, para un enlace que no puede serlo (uno que otra pieza dibuja). */
export function claseBoton({ variante = 'primario', forma = 'confirmacion', tamano = 'normal' } = {}) {
    const [claseTamano] = TAMANOS[tamano] ?? TAMANOS.normal;
    const aireDelFoco = SOBRE_PRIMARIO.includes(variante)
        ? 'focus-visible:ring-offset-primary'
        : 'dark:focus-visible:ring-offset-surface-dark';

    return `${BASE} ${aireDelFoco} ${claseTamano} ${FORMAS[forma] ?? FORMAS.confirmacion} ${VARIANTES[variante] ?? VARIANTES.primario}`;
}

export default function Boton({
    variante = 'primario',
    forma = 'confirmacion',
    tamano = 'normal',
    href = null,
    externo = false,
    tipo = 'submit',
    icono = null,
    cargando = false,
    textoCargando = null,
    className = '',
    children,
    ...props
}) {
    const [, claseIcono] = TAMANOS[tamano] ?? TAMANOS.normal;
    const clases = `${claseBoton({ variante, forma, tamano })} ${cargando ? 'cursor-wait active:scale-100' : ''} ${className}`;

    let contenido = (
        <>
            {icono && <Icono nombre={icono} className={claseIcono} />}
            {children}
        </>
    );

    // Cargando no se atenúa: con `opacity-50` el texto no llega a 4,5:1. Las dos
    // etiquetas ocupan la misma celda y la que no se ve reserva el ancho, así el
    // botón no salta al cambiar de una a otra.
    if (cargando || textoCargando) {
        contenido = (
            <span className="grid">
                <span className={`col-start-1 row-start-1 inline-flex items-center justify-center gap-2 ${cargando ? 'invisible' : ''}`}>
                    {contenido}
                </span>
                <span className={`col-start-1 row-start-1 inline-flex items-center justify-center gap-2 ${cargando ? '' : 'invisible'}`}>
                    <Icono nombre="progress_activity" className={`animate-spin ${claseIcono}`} />
                    {textoCargando}
                </span>
            </span>
        );
        props = {
            ...props,
            'aria-busy': cargando || undefined,
            'aria-disabled': cargando || undefined,
            onClick: cargando ? (evento) => evento.preventDefault() : props.onClick,
        };
    }

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
