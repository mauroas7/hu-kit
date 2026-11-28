import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from './ApplicationLogo.jsx';
import AvisoFlotante from './AvisoFlotante.jsx';
import Icono from './Icono.jsx';
import InterruptorTema from './InterruptorTema.jsx';
import MenuDeUsuario from './MenuDeUsuario.jsx';
import Migas from './Migas.jsx';
import SaltarAlContenido from './SaltarAlContenido.jsx';
import useMenuLateral from './useMenuLateral.js';

const CLASES_ACCION =
    'flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-4 text-base font-semibold text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_20px_-10px_rgba(0,0,0,0.6)] transition-colors duration-200 motion-reduce:transition-none hover:bg-secondary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary dark:focus-visible:ring-offset-surface-dark';

/** El botón dorado de ancho completo del panel: `Link` si lleva `href`, botón si no. */
function Accion({ etiqueta, icono = 'add', href = null, onClick = null }) {
    const contenido = (
        <>
            <Icono nombre={icono} className="text-xl" />
            {etiqueta}
        </>
    );

    return href ? (
        <Link href={href} onClick={onClick} className={CLASES_ACCION}>
            {contenido}
        </Link>
    ) : (
        <button type="button" onClick={onClick} className={CLASES_ACCION}>
            {contenido}
        </button>
    );
}

/**
 * El marco del paciente. Se arma igual que `MarcoApp` —panel a todo el alto,
 * unido de forma recta al contenido, sin tarjeta ni sombra—: lo que cambia es
 * lo que lleva el panel, en tres zonas (logo, `accion` y `navegacion`; sólo
 * la navegación se desplaza) y, fijo abajo, `pieDelPanel`, un nodo para lo que
 * tiene que verse siempre («Contacto y ayuda»). `accion` es `{ etiqueta, icono,
 * href | onClick }`; `navegacion`, un nodo. En oscuro el panel pasa a
 * `surface-dark` con borde, no queda `primary`. `migas` es la ruta de la
 * cabecera, `[{ etiqueta, href | onClick, externo }]` (en el celular, el logo;
 * `externo`, a otro sistema, sin visita de Inertia); `encabezado`, un nodo que
 * la reemplaza. `volver`, `{ href, etiqueta, externo }`, es la flecha del
 * celular a la izquierda de la cabecera; con ella, el botón del menú pasa a la
 * derecha. `lateral` es una columna a la derecha
 * del contenido, a todo su alto y fuera de su margen (las novedades del inicio);
 * se oculta sola con sus clases. `pie` es una franja clara, `barraInferior`
 * queda fija abajo en el celular y `conTema` suma el interruptor «Modo oscuro»
 * al final de la navegación. Sin `navegacion` no hay panel ni botón de menú:
 * el logo de la cabecera se ve en todos los anchos y `conTema` pone «Modo
 * oscuro» en el menú de la cuenta.
 */
export default function MarcoPortal({
    titulo = 'Inicio',
    usuario = null,
    enlaces = [],
    salir = null,
    inicio = null,
    encabezado = null,
    migas = null,
    volver = null,
    navegacion = null,
    accion = null,
    pieDelPanel = null,
    barraInferior = null,
    lateral = null,
    pie = null,
    conTema = false,
    children,
}) {
    const { abierto, abrir, cerrar, menuRef, botonRef } = useMenuLateral();

    // Con el menú abierto en el celular el resto no responde. En React 18 `inert` pasa como string.
    const inerte = abierto ? '' : undefined;
    const logo = <ApplicationLogo variante="blanco" className="h-auto w-full" />;
    const botonMenu = navegacion && (
        <button
            type="button"
            ref={botonRef}
            onClick={abierto ? cerrar : abrir}
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-canvas text-primary hover:bg-gray-100 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10 lg:hidden"
            aria-expanded={abierto}
            aria-controls="menu-portal"
            aria-label={abierto ? 'Cerrar el menú' : 'Abrir el menú'}
        >
            <Icono nombre={abierto ? 'close' : 'menu'} className="text-2xl" />
        </button>
    );

    return (
        <div className="flex min-h-screen bg-canvas dark:bg-canvas-dark">
            <SaltarAlContenido />
            <Head title={titulo} />

            {navegacion && (
                <aside className="hidden w-72 shrink-0 bg-primary-dark lg:block dark:border-r dark:border-white/10 dark:bg-surface-dark">
                    <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-gradient-to-b from-primary via-primary to-primary-dark dark:bg-none">
                        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-glow-white" />

                        <div className="relative flex shrink-0 items-center border-b border-white/10 px-6 py-3">
                            <div className="flex min-h-11 items-center">
                                {/* Un `a` común: el inicio es otro sistema. Fuera del teclado, porque el encabezado ya trae la vuelta. */}
                                {inicio ? (
                                    <a href={inicio} tabIndex={-1} aria-hidden="true" className="block h-auto w-36 shrink-0">
                                        {logo}
                                    </a>
                                ) : (
                                    <div className="block h-auto w-36 shrink-0">{logo}</div>
                                )}
                            </div>
                        </div>

                        {accion && (
                            <div className="relative shrink-0 px-4 pt-5">
                                <Accion {...accion} />
                            </div>
                        )}

                        <div className="relative flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 pb-4 pt-5">
                            {navegacion}
                            {conTema && (
                                <div className="mt-auto border-t border-white/10 pt-3">
                                    <InterruptorTema />
                                </div>
                            )}
                        </div>

                        {pieDelPanel && <div className="relative shrink-0 border-t border-white/10 px-3 py-3">{pieDelPanel}</div>}
                    </div>
                </aside>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="relative border-b border-gray-100 bg-white px-4 py-3 dark:border-gray-800 dark:bg-surface-dark sm:px-5 lg:px-8">
                    {/* `min-h-12`: el alto del logo, así la cabecera mide lo mismo que la zona del logo del panel. */}
                    <div className="flex min-h-12 items-center justify-between gap-4">
                        {volver ? <Volver {...volver} /> : botonMenu}

                        <div className="min-w-0 flex-1">
                            {encabezado ??
                                (migas ? (
                                    <div className="flex items-center justify-center gap-6 lg:justify-start">
                                        {navegacion ? (
                                            <ApplicationLogo className="h-auto w-36 lg:hidden" />
                                        ) : (
                                            <LogoSinPanel inicio={inicio} />
                                        )}
                                        <Migas migas={migas} />
                                    </div>
                                ) : (
                                    <h1 className="titulo-corto text-base text-primary dark:text-gray-100">{titulo}</h1>
                                ))}
                        </div>

                        {volver && botonMenu}
                        {usuario && <MenuDeUsuario usuario={usuario} enlaces={enlaces} salir={salir} conTema={conTema && ! navegacion} />}
                    </div>

                    {/* El fondo cubre el contenido bajo la cabecera y cierra el menú al tocarlo; el menú va encima por venir después. */}
                    {abierto && navegacion && (
                        <div aria-hidden="true" onClick={cerrar} className="absolute inset-x-0 top-full z-dropdown h-[100dvh] bg-primary-dark/50 lg:hidden" />
                    )}

                    {abierto && navegacion && (
                        // Una sección con `onClick` cambia lo que se muestra sin navegar: el menú se cierra al elegir.
                        <div
                            id="menu-portal"
                            ref={menuRef}
                            onClick={(e) => e.target.closest('a[href], button') && cerrar()}
                            className="absolute inset-x-0 top-full z-dropdown max-h-[calc(100dvh-73px)] animate-menu-in overflow-y-auto overscroll-contain border-b border-white/10 bg-gradient-to-b from-primary to-primary-dark px-3 pb-3 pt-4 dark:bg-none dark:bg-surface-dark lg:hidden"
                        >
                            {accion && (
                                <div className="mb-3">
                                    <Accion {...accion} />
                                </div>
                            )}
                            {navegacion}
                            {conTema && (
                                <div className="mt-3 border-t border-white/10 pt-3">
                                    <InterruptorTema />
                                </div>
                            )}
                            {pieDelPanel && <div className="mt-3 border-t border-white/10 pt-3">{pieDelPanel}</div>}
                        </div>
                    )}
                </header>

                <div className="flex min-w-0 flex-1">
                    <main
                        id="contenido"
                        tabIndex={-1}
                        inert={inerte}
                        className={`w-full min-w-0 flex-1 p-4 focus:outline-none sm:p-5 lg:p-8 ${barraInferior ? 'pb-28 lg:pb-8' : ''}`}
                    >
                        {children}
                    </main>

                    {lateral && (
                        <div inert={inerte} className="flex shrink-0">
                            {lateral}
                        </div>
                    )}
                </div>

                {/* Con `barraInferior`, el final del pie queda por encima de la barra fija del celular. */}
                {pie && (
                    <footer
                        inert={inerte}
                        className={`border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-surface-dark ${barraInferior ? 'pb-20 lg:pb-0' : ''}`}
                    >
                        {pie}
                    </footer>
                )}
            </div>

            {barraInferior && ! abierto && (
                <div data-barra-inferior className="fixed inset-x-3 bottom-3 z-dropdown lg:hidden">
                    {barraInferior}
                </div>
            )}

            <AvisoFlotante className={barraInferior ? 'inset-x-3 bottom-24 lg:inset-x-auto lg:bottom-6 lg:right-6' : undefined} />
        </div>
    );
}

/** La flecha del celular a la izquierda de la cabecera: `externo` sale a otro sistema con un `a` común. */
function Volver({ href, etiqueta, externo = false }) {
    const props = {
        href,
        'aria-label': etiqueta,
        title: etiqueta,
        className:
            'flex size-11 shrink-0 items-center justify-center rounded-xl text-primary transition-colors hover:bg-canvas dark:text-gray-100 dark:hover:bg-white/5 lg:hidden',
    };
    const icono = <Icono nombre="arrow_back" className="text-2xl" />;

    return externo ? <a {...props}>{icono}</a> : <Link {...props}>{icono}</Link>;
}

/** Sin panel, el logo queda en la cabecera en todos los anchos; fuera del teclado, como el del panel. */
function LogoSinPanel({ inicio }) {
    const logo = <ApplicationLogo className="h-auto w-full" />;

    return inicio ? (
        <a href={inicio} tabIndex={-1} aria-hidden="true" className="block w-36 shrink-0">
            {logo}
        </a>
    ) : (
        <div className="w-36 shrink-0">{logo}</div>
    );
}
