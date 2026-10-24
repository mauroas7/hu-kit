import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * El modo claro/oscuro. No se persiste: las máquinas del hospital son
 * compartidas y el modo del usuario anterior no puede sobrevivir al cambio de
 * sesión. Es un contexto porque el toggle puede estar montado más de una vez.
 */
const ThemeContext = createContext({ theme: 'light', alternar: () => {} });

const usuarioDeAuth = (pagina) => pagina?.props?.auth?.usuario?.id ?? null;

/**
 * El provider va por encima de la app y no ve cambiar sus props: el usuario lo
 * lee de cada página con `usuarioDe`, porque el login y el logout son visitas
 * de Inertia que no recargan.
 */
export function ThemeProvider({ usuarioInicial = null, usuarioDe = usuarioDeAuth, children }) {
    const [theme, setTheme] = useState('light');
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

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const alternar = useCallback(
        () => setTheme((actual) => (actual === 'dark' ? 'light' : 'dark')),
        [],
    );

    const valor = useMemo(() => ({ theme, alternar }), [theme, alternar]);

    return <ThemeContext.Provider value={valor}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}
