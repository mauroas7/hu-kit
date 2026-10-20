import Icono from './Icono.jsx';
import { marcoTarjeta } from './Tarjeta.jsx';

const TONOS = {
    exito: ['text-emerald-700 dark:text-emerald-400', 'bg-emerald-50 dark:bg-emerald-950/40'],
    error: ['text-red-700 dark:text-red-400', 'bg-red-50 dark:bg-red-950/40'],
    aviso: ['text-secondary-dark dark:text-secondary-light', 'bg-secondary-faint dark:bg-secondary/10'],
    neutro: ['text-primary dark:text-gray-100', 'bg-primary-faint dark:bg-primary/20'],
};

/**
 * El número grande de los paneles, con su etiqueta y su detalle al pie. La
 * etiqueta pasa a dos líneas antes que cortarse, y el detalle va siempre abajo
 * para que quede parejo entre métricas vecinas.
 */
export default function Metrica({
    valor,
    etiqueta,
    icono = null,
    detalle = null,
    tono = 'neutro',
    className = '',
}) {
    const [textoTono, fondoTono] = TONOS[tono] ?? TONOS.neutro;

    return (
        <div
            className={`flex h-full flex-col px-5 py-4 ${marcoTarjeta} ${className}`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className={`text-3xl font-black ${textoTono}`}>{valor}</p>
                    <p className="mt-0.5 text-sm text-brandText dark:text-brandText-dark">{etiqueta}</p>
                </div>

                {icono && (
                    <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${fondoTono} ${textoTono}`}
                    >
                        <Icono nombre={icono} className="text-xl" relleno />
                    </span>
                )}
            </div>

            {detalle && <p className="mt-auto pt-2 text-xs text-brandText-muted dark:text-brandText-mutedDark">{detalle}</p>}
        </div>
    );
}
