import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * El modo claro/oscuro. No se persiste: las máquinas del hospital son
 * compartidas y el modo del usuario anterior no puede sobrevivir al cambio de
 * sesión. Es un contexto porque el toggle puede estar montado más de una vez.
 * El modo oscuro es sólo de las pantallas con sesión: el ingreso lo ignora
 * con `useSoloClaro`.
 */
const ThemeContext = createContext({ theme: 'light', alternar: () => {}, forzarClaro: () => () => {} });

const usuarioDeAuth = (pagina) => pagina?.props?.auth?.usuario?.id ?? null;

/**
 * El provider va por encima de la app y no ve cambiar sus props: el usuario lo
 * lee de cada página con `usuarioDe`, porque el login y el logout son visitas
 * de Inertia que no recargan.
 */
export function ThemeProvider({ usuarioInicial = null, usuarioDe = usuarioDeAuth, children }) {
    const [theme, setTheme] = useState('light');
    const [forzados, setForzados] = useState(0);
    const usuario = useRef(usuarioInicial);

    useEffect(
        () =>
            router.on('navigate', (evento) => {
                const actual = usuarioDe(evento.detail.page);

                // Cambió de usuario: vuelve a claro, que es como arranca toda sesión.
                if (actual !== usuario.current) {
                    usuario.current = actual;
                    setTheme('light');
                }
            }),
        [usuarioDe],
    );

    // Layout effect: con un `useEffect` habría un cuadro en oscuro antes de pasar a claro.
    useLayoutEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark' && forzados === 0);
    }, [theme, forzados]);

    const alternar = useCallback(
        () => setTheme((actual) => (actual === 'dark' ? 'light' : 'dark')),
        [],
    );

    const forzarClaro = useCallback(() => {
        setForzados((n) => n + 1);

        return () => setForzados((n) => n - 1);
    }, []);

    const valor = useMemo(() => ({ theme, alternar, forzarClaro }), [theme, alternar, forzarClaro]);

    return <ThemeContext.Provider value={valor}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}

/** Mientras la pantalla que lo llama está montada, el tema es claro aunque el estado diga oscuro. */
export function useSoloClaro() {
    const { forzarClaro } = useTheme();

    useLayoutEffect(() => forzarClaro(), [forzarClaro]);
}
