import Icono from './Icono.jsx';
import { useTheme } from './useTheme.jsx';

/** Alterna claro/oscuro. El tema no se persiste: ver `useTheme`. */
export default function ThemeToggle({ className = '' }) {
    const { theme, alternar } = useTheme();
    const oscuro = theme === 'dark';

    return (
        <button
            type="button"
            onClick={alternar}
            aria-label={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={oscuro ? 'Modo claro' : 'Modo oscuro'}
            className={`flex size-11 items-center justify-center rounded-xl text-brandText transition-colors hover:bg-canvas dark:text-brandText-dark dark:hover:bg-white/5 ${className}`}
        >
            <Icono nombre={oscuro ? 'light_mode' : 'dark_mode'} className="text-xl" />
        </button>
    );
}
