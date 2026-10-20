import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * El modo claro/oscuro. No se persiste: las máquinas del hospital son
 * compartidas y el modo del usuario anterior no puede sobrevivir al cambio de
 * sesión. Es un contexto porque el toggle puede estar montado más de una vez.
 */
const ThemeContext = createContext({ theme: 'light', alternar: () => {} });

export function ThemeProvider({ usuarioInicial = null, children }) {
    const [theme, setTheme] = useState('light');
    const [usuario, setUsuario] = useState(usuarioInicial);

    // Cambió de usuario: vuelve a claro, que es como arranca toda sesión.
    if (usuario !== usuarioInicial) {
        setUsuario(usuarioInicial);
        setTheme('light');
    }

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
