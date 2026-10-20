import Icono from './Icono.jsx';
import { marcoTarjeta } from './Tarjeta.jsx';

/**
 * Lo que se muestra cuando no hay nada: qué pasa y quién lo va a mover. Sola es
 * una tarjeta, como un paso del portal sin nada que hacer; con `enTarjeta` va
 * adentro de otra, en el lugar de la lista vacía. `listo` es cuando ya está
 * resuelto.
 */
export default function EstadoVacio({ icono, titulo = null, listo = false, enTarjeta = false, children }) {
    const circulo = (
        <span
            className={`flex size-12 shrink-0 items-center justify-center rounded-full ${
                listo
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : 'bg-canvas text-brandText-muted dark:text-brandText-mutedDark dark:bg-white/5'
            }`}
        >
            <Icono nombre={icono} className="text-2xl" />
        </span>
    );

    if (enTarjeta) {
        return (
            <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
                {circulo}
                <div>
                    {titulo && <p className="font-semibold text-primary dark:text-gray-100">{titulo}</p>}
                    <p className="text-sm text-brandText-muted dark:text-brandText-mutedDark">{children}</p>
                </div>
            </div>
        );
    }

    return (
        <section className={`flex max-w-3xl items-start gap-4 p-4 sm:p-6 ${marcoTarjeta}`}>
            {circulo}
            <div className="min-w-0">
                <h2 className="text-xl font-black text-primary dark:text-gray-100">{titulo}</h2>
                <p className="mt-1 text-base text-brandText dark:text-brandText-dark">{children}</p>
            </div>
        </section>
    );
}
