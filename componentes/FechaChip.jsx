import { aFecha, fechaIso } from './fechas.js';

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/**
 * El mini calendario de una fila: mes y día. Va junto a la fecha en texto, así
 * que para un lector de pantalla es decorativo. `pasado` lo apaga, para lo que
 * ya ocurrió.
 */
export default function FechaChip({ fecha, pasado = false }) {
    const dia = aFecha(fecha);

    return (
        <time
            dateTime={fechaIso(dia)}
            aria-hidden="true"
            className={`flex size-12 shrink-0 flex-col overflow-hidden rounded-xl border text-center tabular-nums ${
                pasado
                    ? 'border-gray-200 bg-white text-brandText dark:border-gray-700 dark:bg-transparent dark:text-brandText-dark'
                    : 'border-secondary/40 bg-white text-primary dark:border-gray-700 dark:bg-surface-dark dark:text-gray-100'
            }`}
        >
            <span
                className={`text-xs font-black uppercase leading-4 ${
                    pasado ? 'bg-gray-100 dark:bg-white/5' : 'bg-secondary text-primary'
                }`}
            >
                {MESES[dia.getMonth()]}
            </span>
            <span className="flex flex-1 items-center justify-center text-lg font-black leading-none">{dia.getDate()}</span>
        </time>
    );
}
