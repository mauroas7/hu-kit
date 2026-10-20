import Icono from './Icono.jsx';

const ESTILOS = {
    exito: ['bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900', 'check_circle'],
    error: ['bg-red-50 text-red-900 border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-900', 'error'],
    aviso: ['bg-secondary-faint text-brandText border-secondary/40 dark:bg-secondary/10 dark:text-brandText-dark dark:border-secondary/30', 'warning'],
    info: ['bg-primary-faint text-primary border-primary-soft dark:bg-primary/20 dark:text-gray-100 dark:border-primary-light', 'info'],
};

export default function Alerta({ tipo = 'info', titulo = null, className = '', children }) {
    const [clases, icono] = ESTILOS[tipo] ?? ESTILOS.info;

    return (
        <div role="alert" className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${clases} ${className}`}>
            <Icono nombre={icono} className="mt-px shrink-0 text-lg" relleno />

            {/* `min-w-0` deja que el texto largo se parta en vez de empujar el borde. */}
            <div className="min-w-0 flex-1 space-y-0.5 break-words">
                {titulo && <p className="font-semibold">{titulo}</p>}
                <div>{children}</div>
            </div>
        </div>
    );
}
