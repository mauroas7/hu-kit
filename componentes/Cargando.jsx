import Icono from './Icono.jsx';

/**
 * Lo que se ve mientras llega algo: el ícono que gira y un texto. Sola va en
 * renglón, junto a lo que espera; `enTarjeta` ocupa el lugar de una lista que
 * todavía no llegó, también como `fallback` de un `<Deferred>` de Inertia. Con
 * `prefers-reduced-motion`, `estilos.css` lo deja quieto.
 */
export default function Cargando({ enTarjeta = false, className = '', children = 'Cargando…' }) {
    const forma = enTarjeta ? 'flex-col justify-center px-4 py-8 text-center' : '';

    return (
        <div role="status" className={`flex items-center gap-2 text-sm text-brandText-muted dark:text-brandText-mutedDark ${forma} ${className}`}>
            <Icono nombre="progress_activity" className="animate-spin text-2xl text-primary dark:text-gray-300" />
            <span>{children}</span>
        </div>
    );
}
