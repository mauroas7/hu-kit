import Icono from './Icono.jsx';

const TONOS = {
    exito: 'bg-emerald-50 text-emerald-800 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300',
    error: 'bg-red-50 text-red-800 ring-red-600/20 dark:bg-red-950/40 dark:text-red-300',
    aviso: 'bg-secondary-faint text-secondary-dark ring-secondary/30 dark:bg-secondary/10 dark:text-secondary-light',
    info: 'bg-primary-faint text-primary ring-primary/20 dark:bg-primary/20 dark:text-gray-100',
    neutro: 'bg-canvas text-brandText ring-brandText/20 dark:bg-white/5 dark:text-brandText-dark',
};

/*
 * La píldora no se parte. `partible` es para la columna de una tabla que no
 * entraría con ella entera: por debajo de 1340 px pasa a dos renglones con forma
 * de etiqueta, en vez de empujar la tabla a desplazarse.
 */
const FORMA = {
    entera: 'whitespace-nowrap rounded-full',
    partible: 'rounded-lg text-left min-[1340px]:whitespace-nowrap min-[1340px]:rounded-full',
};

// `grande` es el del portal del paciente, donde un dato no baja de 14 px.
const TAMANOS = {
    normal: ['text-xs', 'text-sm'],
    grande: ['text-sm', 'text-base'],
};

/** La píldora de estado: semáforo del caso, estado de un trámite, contadores. */
export default function Estado({ tono = 'neutro', icono = null, partible = false, tamano = 'normal', className = '', children, ...props }) {
    const [claseTexto, claseIcono] = TAMANOS[tamano] ?? TAMANOS.normal;

    return (
        <span
            {...props}
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 ${claseTexto} font-semibold ring-1 ring-inset ${FORMA[partible ? 'partible' : 'entera']} ${TONOS[tono] ?? TONOS.neutro} ${className}`}
        >
            {icono && <Icono nombre={icono} className={claseIcono} relleno />}
            {children}
        </span>
    );
}
