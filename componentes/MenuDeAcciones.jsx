import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import Icono from './Icono.jsx';

/**
 * Las acciones que no entran como botón, detrás de los tres puntos. El panel
 * flota anclado al botón (`anchor`): una tabla con scroll no lo recorta y,
 * dentro de un modal, queda por encima. Las acciones van como `ItemDeMenu`.
 */
export default function MenuDeAcciones({ etiqueta = 'Más acciones', icono = 'more_vert', children }) {
    return (
        <Menu>
            <MenuButton
                aria-label={etiqueta}
                title={etiqueta}
                className="flex size-control shrink-0 items-center justify-center rounded-xl border border-brandText-soft/80 bg-white text-brandText-muted transition-colors hover:border-secondary hover:text-primary dark:border-gray-700 dark:bg-surface-dark dark:text-brandText-mutedDark dark:hover:text-gray-100"
            >
                <Icono nombre={icono} className="text-xl" />
            </MenuButton>

            <MenuItems
                transition
                anchor={{ to: 'bottom end', gap: 4 }}
                className="z-flotante w-56 rounded-xl border border-brandText-soft/80 bg-white py-1 shadow-xl transition duration-150 ease-out focus:outline-none data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:border-gray-700 dark:bg-surface-dark"
            >
                {children}
            </MenuItems>
        </Menu>
    );
}

/** Una acción de `MenuDeAcciones`: `peligro` la pinta de rojo y `separado` la aparta con una raya. */
export function ItemDeMenu({ onClick = null, href = null, icono = null, peligro = false, separado = false, children }) {
    const tono = peligro
        ? 'text-red-600 hover:bg-red-50 data-[focus]:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 dark:data-[focus]:bg-red-950/30'
        : 'text-primary hover:bg-canvas data-[focus]:bg-canvas dark:text-gray-100 dark:hover:bg-white/5 dark:data-[focus]:bg-white/5';
    const clases = `flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-semibold ${tono}`;
    const contenido = (
        <>
            {icono && <Icono nombre={icono} className="text-lg" />}
            {children}
        </>
    );

    return (
        <>
            {separado && <div className="my-1 border-t border-brandText-soft/40 dark:border-gray-800" />}

            <MenuItem>
                {href ? (
                    <Link href={href} className={clases}>
                        {contenido}
                    </Link>
                ) : (
                    <button type="button" onClick={onClick} className={clases}>
                        {contenido}
                    </button>
                )}
            </MenuItem>
        </>
    );
}
