import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link, router } from '@inertiajs/react';
import Icono from './Icono.jsx';

const ITEM =
    'flex w-full items-center gap-3 px-5 py-3 text-sm font-black text-primary transition-colors hover:bg-canvas data-[focus]:bg-canvas dark:text-gray-100 dark:hover:bg-white/5 dark:data-[focus]:bg-white/5';

function Enlace({ etiqueta, icono = null, href = null, externo = false, deshabilitado = false, titulo = undefined }) {
    const contenido = (
        <>
            {icono && <Icono nombre={icono} className="text-xl text-secondary-dark dark:text-secondary" />}
            {etiqueta}
        </>
    );

    if (deshabilitado || ! href) {
        return (
            <MenuItem disabled>
                <span className={`${ITEM} cursor-not-allowed opacity-60`} title={titulo}>
                    {contenido}
                </span>
            </MenuItem>
        );
    }

    return (
        <MenuItem>
            {externo ? (
                <a href={href} className={ITEM} title={titulo}>
                    {contenido}
                </a>
            ) : (
                <Link href={href} className={ITEM} title={titulo}>
                    {contenido}
                </Link>
            )}
        </MenuItem>
    );
}

/**
 * Quién está adentro y la salida, como en portal-hospital: nombre, detalle e
 * inicial abren un menú con los `enlaces` de la cuenta y cerrar sesión. En
 * celular queda sólo la inicial. `detalle` va bajo el nombre (si falta, el
 * `rol`); `salir` en null es para quien sale desde otro sistema, como el
 * paciente que llega del portal.
 */
export default function MenuDeUsuario({ usuario, enlaces = [], salir = null }) {
    const inicial = usuario.nombre?.trim().charAt(0).toUpperCase() || '?';
    const detalle = usuario.detalle ?? usuario.rol;

    return (
        <Menu as="div" className="relative">
            <MenuButton
                aria-label={`Menú de ${usuario.nombre}`}
                className="group flex items-center gap-3 rounded-xl text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-secondary"
            >
                <span className="hidden max-w-56 sm:block">
                    <span className="block truncate text-[13px] font-black uppercase leading-none text-primary dark:text-gray-100">
                        {usuario.nombre}
                    </span>
                    {detalle && (
                        <span className="mt-1.5 block truncate text-xs font-black uppercase tracking-[0.15em] text-secondary-dark dark:text-secondary">
                            {detalle}
                        </span>
                    )}
                </span>

                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary font-black text-white shadow-md transition-transform dark:bg-primary-light group-hover:scale-105">
                    {inicial}
                </span>
            </MenuButton>

            <MenuItems
                transition
                className="absolute right-0 top-full z-dropdown mt-3 w-64 max-w-[90vw] origin-top-right rounded-2xl border border-brandText-soft/80 bg-white py-2 shadow-2xl transition duration-150 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 dark:border-gray-800 dark:bg-surface-dark"
            >
                {/* Lo que ya está en el botón desde `sm`, acá sólo lo ve el celular, que muestra la inicial. */}
                <div className="border-b border-brandText-soft/40 px-5 pb-3 pt-2 dark:border-gray-800">
                    <p className="truncate text-sm font-black text-primary sm:hidden dark:text-gray-100">{usuario.nombre}</p>
                    {usuario.email && (
                        <p className="truncate text-xs text-brandText-muted dark:text-brandText-mutedDark">{usuario.email}</p>
                    )}
                    {usuario.rol && (
                        <p
                            className={`mt-1.5 text-xs font-black uppercase tracking-[0.15em] text-secondary-dark dark:text-secondary ${
                                detalle === usuario.rol ? 'sm:hidden' : ''
                            }`}
                        >
                            {usuario.rol}
                        </p>
                    )}
                </div>

                {enlaces.length > 0 && (
                    <div className="border-b border-brandText-soft/40 py-1 dark:border-gray-800">
                        {enlaces.map((enlace) => (
                            <Enlace key={enlace.etiqueta} {...enlace} />
                        ))}
                    </div>
                )}

                {salir && (
                    <MenuItem>
                        <button
                            type="button"
                            onClick={() => router.post(salir)}
                            className="mt-1 flex w-full items-center gap-3 px-5 py-3 text-sm font-black uppercase tracking-wider text-red-600 transition-colors hover:bg-red-50 data-[focus]:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 dark:data-[focus]:bg-red-950/30"
                        >
                            <Icono nombre="logout" className="text-xl" /> Cerrar sesión
                        </button>
                    </MenuItem>
                )}
            </MenuItems>
        </Menu>
    );
}
