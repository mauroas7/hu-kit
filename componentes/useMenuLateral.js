import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * El menú que se abre y se cierra en el celular, para los marcos. Se cierra
 * solo al navegar, porque el marco no se desmonta entre secciones; abierto, el
 * foco entra al menú, Escape lo cierra y el foco vuelve al botón que lo abrió.
 * Abierto, el fondo no se desplaza: lo de abajo correría bajo el menú.
 */
export default function useMenuLateral() {
    const [abierto, setAbierto] = useState(false);
    const menuRef = useRef(null);
    const botonRef = useRef(null);

    useEffect(() => router.on('navigate', () => setAbierto(false)), []);

    useEffect(() => {
        if (! abierto) return undefined;

        const alTeclear = (e) => e.key === 'Escape' && setAbierto(false);
        document.addEventListener('keydown', alTeclear);
        // Dos cuadros después: un cajón que se abre con `visibility` en transición sigue oculto, y no admite foco, en el primero.
        let cuadro = requestAnimationFrame(() => {
            cuadro = requestAnimationFrame(() => {
                menuRef.current?.querySelector('a[href], button:not([disabled])')?.focus({ preventScroll: true });
            });
        });

        return () => {
            cancelAnimationFrame(cuadro);
            document.removeEventListener('keydown', alTeclear);
            botonRef.current?.focus();
        };
    }, [abierto]);

    useEffect(() => {
        if (! abierto) return undefined;

        const antes = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.documentElement.style.overflow = antes;
        };
    }, [abierto]);

    return { abierto, abrir: () => setAbierto(true), cerrar: () => setAbierto(false), menuRef, botonRef };
}
