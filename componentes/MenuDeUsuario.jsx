import { useEffect, useId, useRef, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import Icono from './Icono.jsx';
import { useTheme } from './useTheme.jsx';

const ITEM =
    'flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-brandText transition-colors hover:bg-canvas focus:outline-none focus-visible:bg-canvas dark:text-brandText-dark dark:hover:bg-white/5 dark:focus-visible:bg-white/5';

// Lo que recorren las flechas: el ítem deshabilitado es un `span` y queda afuera.
const RECORRIBLES = 'a[href], button';

function Enlace({ etiqueta, icono = null, href = null, externo = false, deshabilitado = false, titulo = undefined, alElegir }) {
    const contenido = (
        <>
            {icono && <Icono nombre={icono} className="text-[20px]" />}
            {etiqueta}
        </>
    );

    if (deshabilitado || ! href) {
        return (
            <li>
                <span aria-disabled="true" className={`${ITEM} cursor-not-allowed opacity-60`} title={titulo}>
                    {contenido}
                </span>
            </li>
        );
    }

    return (
        <li>
            {externo ? (
                <a href={href} className={ITEM} title={titulo} onClick={alElegir}>
                    {contenido}
                </a>
            ) : (
                <Link href={href} className={ITEM} title={titulo} onClick={alElegir}>
                    {contenido}
                </Link>
            )}
        </li>
    );
}

/**
 * Quién está adentro y la salida: nombre, `rol` e inicial abren los `enlaces` de
 * la cuenta y cerrar sesión (en celular, sólo la inicial; `detalle`, sólo adentro;
 * `salir` en null si se sale desde otro sistema). `conTema` suma el interruptor
 * «Modo oscuro» antes de cerrar sesión. Es una divulgación, no un `menu`: botón
 * con `aria-expanded`, lista de enlaces, flechas para recorrerla y Escape.
 */
export default function MenuDeUsuario({ usuario, enlaces = [], salir = null, conTema = false }) {
    const inicial = usuario.nombre?.trim().charAt(0).toUpperCase() || '?';
    const [abierto, setAbierto] = useState(false);
    const idPanel = useId();
    const contenedorRef = useRef(null);
    const botonRef = useRef(null);
    const panelRef = useRef(null);
    const enfocarPrimero = useRef(false);

    const cerrar = () => setAbierto(false);
    const primerItem = () => panelRef.current?.querySelector(RECORRIBLES);

    useEffect(() => {
        if (! abierto) return undefined;

        if (enfocarPrimero.current) {
            enfocarPrimero.current = false;
            primerItem()?.focus();
        }

        const alTocarAfuera = (e) => {
            if (! contenedorRef.current.contains(e.target)) setAbierto(false);
        };
        const alTeclear = (e) => {
            if (e.key !== 'Escape') return;
            setAbierto(false);
            botonRef.current.focus();
        };
        document.addEventListener('pointerdown', alTocarAfuera);
        document.addEventListener('keydown', alTeclear);

        return () => {
            document.removeEventListener('pointerdown', alTocarAfuera);
            document.removeEventListener('keydown', alTeclear);
        };
    }, [abierto]);

    function alTeclearEnBoton(e) {
        if (e.key !== 'ArrowDown') return;
        e.preventDefault();

        if (abierto) {
            primerItem()?.focus();
        } else {
            enfocarPrimero.current = true;
            setAbierto(true);
        }
    }

    function moverConFlechas(e) {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        e.preventDefault();

        const items = [...panelRef.current.querySelectorAll(RECORRIBLES)];
        const actual = items.indexOf(document.activeElement);
        const siguiente = e.key === 'ArrowDown' ? actual + 1 : actual - 1;
        items[Math.min(Math.max(siguiente, 0), items.length - 1)]?.focus();
    }

    // Tab hacia afuera cierra. Un clic en una zona sin foco del panel no: el panel lo toma (`tabIndex={-1}`).
    function alSalirElFoco(e) {
        if (! contenedorRef.current.contains(e.relatedTarget)) setAbierto(false);
    }

    return (
        <div ref={contenedorRef} className="relative" onBlur={alSalirElFoco}>
            <button
                ref={botonRef}
                type="button"
                aria-label={`Menú de ${usuario.nombre}`}
                aria-expanded={abierto}
                aria-controls={idPanel}
                onClick={() => setAbierto(! abierto)}
                onKeyDown={alTeclearEnBoton}
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
            </button>

            {abierto && (
                <div
                    ref={panelRef}
                    id={idPanel}
                    tabIndex={-1}
                    onKeyDown={moverConFlechas}
                    className="absolute right-0 top-full z-dropdown mt-3 w-64 max-w-[90vw] origin-top-right animate-menu-in overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl focus:outline-none dark:border-gray-800 dark:bg-surface-dark"
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

                    {(enlaces.length > 0 || conTema || salir) && (
                        <ul className="p-1.5">
                            {enlaces.map((enlace) => (
                                <Enlace key={enlace.etiqueta} {...enlace} alElegir={cerrar} />
                            ))}

                            {conTema && <InterruptorTema />}

                            {salir && (
                                <li className={enlaces.length > 0 || conTema ? 'mt-1.5 border-t border-gray-100 pt-1.5 dark:border-gray-800' : ''}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            cerrar();
                                            router.post(salir);
                                        }}
                                        className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus-visible:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30 dark:focus-visible:bg-red-950/30"
                                    >
                                        <Icono nombre="logout" className="text-[20px]" /> Cerrar sesión
                                    </button>
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

/** Elegir el tema no cierra el menú: se ve el cambio y se puede volver atrás. */
function InterruptorTema() {
    const { theme, alternar } = useTheme();
    const oscuro = theme === 'dark';

    return (
        <li>
            <button type="button" role="switch" aria-checked={oscuro} onClick={alternar} className={ITEM}>
                <Icono nombre="dark_mode" className="text-[20px]" />
                <span className="flex-1 text-left">Modo oscuro</span>
                <span
                    aria-hidden="true"
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${oscuro ? 'bg-primary dark:bg-primary-light' : 'bg-gray-500 dark:bg-white/30'}`}
                >
                    <span
                        className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none ${
                            oscuro ? 'translate-x-5' : ''
                        }`}
                    />
                </span>
            </button>
        </li>
    );
}
