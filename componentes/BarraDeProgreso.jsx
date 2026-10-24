/** Cuánto lleva algo que tarda, como una subida: `valor` va de 0 a 100. */
export default function BarraDeProgreso({ valor = 0, etiqueta, className = '' }) {
    const porcentaje = Math.min(100, Math.max(0, Math.round(valor)));

    return (
        <div
            role="progressbar"
            aria-label={etiqueta}
            aria-valuenow={porcentaje}
            aria-valuemin={0}
            aria-valuemax={100}
            className={`h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10 ${className}`}
        >
            <div className="h-full rounded-full bg-primary transition-all dark:bg-secondary" style={{ width: `${porcentaje}%` }} />
        </div>
    );
}
