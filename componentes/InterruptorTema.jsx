import Icono from './Icono.jsx';
import { useTheme } from './useTheme.jsx';

/**
 * «Modo oscuro» como una fila más del panel azul de los marcos, con la perilla
 * a la derecha. `tamano="portal"` es la fila alta del paciente, con el ícono en
 * un círculo; `'app'`, la del personal, como las de `SeccionesDelMenu`.
 */
export default function InterruptorTema({ tamano = 'portal' }) {
    const { theme, alternar } = useTheme();
    const oscuro = theme === 'dark';
    const portal = tamano === 'portal';

    return (
        <button
            type="button"
            role="switch"
            aria-checked={oscuro}
            onClick={alternar}
            className={
                portal
                    ? 'group relative flex min-h-11 w-full items-center gap-3 rounded-2xl px-2 text-left text-base leading-snug text-white/80 transition-colors duration-200 hover:bg-white/5 hover:text-white motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary'
                    : 'flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white'
            }
        >
            {portal ? (
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/85 ring-1 ring-inset ring-white/15">
                    <Icono nombre="dark_mode" className="text-xl" />
                </span>
            ) : (
                <Icono nombre="dark_mode" className="text-xl" />
            )}
            <span className={`min-w-0 flex-1 ${portal ? 'text-white/80' : ''}`}>Modo oscuro</span>
            <span aria-hidden="true" className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${oscuro ? 'bg-white' : 'bg-white/20'}`}>
                <span
                    className={`absolute left-0.5 top-0.5 size-5 rounded-full transition-transform duration-200 motion-reduce:transition-none ${
                        oscuro ? 'translate-x-5 bg-primary' : 'bg-white'
                    }`}
                />
            </span>
        </button>
    );
}
