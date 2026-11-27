import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link, router } from '@inertiajs/react';
import Icono from './Icono.jsx';

const ITEM =
    'flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-brandText transition-colors hover:bg-canvas data-[focus]:bg-canvas dark:text-brandText-dark dark:hover:bg-white/5 dark:data-[focus]:bg-white/5';

function Enlace({ etiqueta, icono = null, href = null, externo = false, deshabilitado = false, titulo = undefined }) {
    const contenido = (
        <>
            {icono && <Icono nombre={icono} className="text-[20px]" />}
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
 * Quién está adentro y la salida, como en portal-hospital: nombre, `rol` e
 * inicial abren un menú con los `enlaces` de la cuenta y cerrar sesión. En
 * celular queda sólo la inicial. `detalle` (el DNI del paciente) va sólo dentro
 * del menú; `salir` en null es para quien sale desde otro sistema.
 */
export default function MenuDeUsuario({ usuario, enlaces = [], salir = null }) {
    const inicial = usuario.nombre?.trim().charAt(0).toUpperCase() || '?';

    return (
        <Menu as="div" className="relative">
            <MenuButton
                aria-label={`Menú de ${usuario.nombre}`}
                className="flex items-center gap-3 rounded-xl text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-secondary"
            >
                <span className="hidden max-w-56 sm:block">
                    <span className="block truncate text-sm font-semibold text-primary dark:text-gray-100">{usuario.nombre}</span>
                    {usuario.rol && (
                        <span className="block truncate text-xs text-brandText-muted dark:text-brandText-mutedDark">{usuario.rol}</span>
                    )}
                </span>

                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary font-black text-white shadow-md dark:bg-primary-light">
                    {inicial}
                </span>
            </MenuButton>

            <MenuItems
                transition
                className="absolute right-0 top-full z-dropdown mt-3 w-64 max-w-[90vw] origin-top-right overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl transition duration-150 ease-out focus:outline-none data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:border-gray-800 dark:bg-surface-dark"
            >
                <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                    <p className="truncate text-sm font-semibold text-primary dark:text-gray-100">{usuario.nombre}</p>
                    {usuario.detalle && (
                        <p className="truncate text-sm text-brandText-muted dark:text-brandText-mutedDark">{usuario.detalle}</p>
                    )}
                    {usuario.email && (
                        <p className="truncate text-xs text-brandText-muted dark:text-brandText-mutedDark">{usuario.email}</p>
                    )}
                    {/* Desde `sm` el rol ya está en el botón. */}
                    {usuario.rol && (
                        <p className="truncate text-xs text-brandText-muted dark:text-brandText-mutedDark sm:hidden">{usuario.rol}</p>
                    )}
                </div>

                {(enlaces.length > 0 || salir) && (
                    <div className="p-1.5">
                        {enlaces.map((enlace) => (
                            <Enlace key={enlace.etiqueta} {...enlace} />
                        ))}

                        {salir && (
                            <div className={enlaces.length > 0 ? 'mt-1.5 border-t border-gray-100 pt-1.5 dark:border-gray-800' : ''}>
                                <MenuItem>
                                    <button
                                        type="button"
                                        onClick={() => router.post(salir)}
                                        className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 data-[focus]:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30 dark:data-[focus]:bg-red-950/30"
                                    >
                                        <Icono nombre="logout" className="text-[20px]" /> Cerrar sesión
                                    </button>
                                </MenuItem>
                            </div>
                        )}
                    </div>
                )}
            </MenuItems>
        </Menu>
    );
}
