import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from './ApplicationLogo.jsx';
import AvisoFlotante from './AvisoFlotante.jsx';
import CabeceraSeccion from './CabeceraSeccion.jsx';
import Icono from './Icono.jsx';
import InterruptorTema from './InterruptorTema.jsx';
import MenuDeUsuario from './MenuDeUsuario.jsx';
import Migas from './Migas.jsx';
import SaltarAlContenido from './SaltarAlContenido.jsx';
import SeccionesDelMenu from './SeccionesDelMenu.jsx';
import useMenuLateral from './useMenuLateral.js';

/*
 * `completo` es para las pantallas de datos —listados, agenda, tableros—, que
 * aprovechan todo el ancho. `lectura` es para formularios y documentos: los
 * mantiene en 1152 px para que los renglones no se estiren en pantallas anchas.
 * `formulario`, en 768 px, un formulario de una sola columna de tarjetas. Los
 * dos arrancan a la izquierda, alineados con el título.
 */
const ANCHOS = {
    completo: '',
    lectura: 'max-w-6xl',
    formulario: 'max-w-3xl',
};

/**
 * «Volver» de la cabecera. `volver` es un href (enlace), una función (botón) o
 * `{ href, onClick, etiqueta }`: href o onClick, y la etiqueta (por defecto
 * «Volver»), que se ve en escritorio y en el celular queda sólo para el lector
 * de pantalla.
 */
function BotonVolver({ volver }) {
    const { href = null, onClick = null, etiqueta = null } =
        typeof volver === 'string' ? { href: volver } : typeof volver === 'function' ? { onClick: volver } : volver;
    // En escritorio, `-ml-2` deja la flecha sobre el borde del título.
    const clases =
        'flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold text-primary transition-colors hover:bg-canvas dark:text-gray-100 dark:hover:bg-white/5 lg:-ml-2 lg:pl-2 lg:pr-3';
    const contenido = (
        <>
            <Icono nombre="arrow_back" className="text-2xl" />
            <span className="sr-only lg:not-sr-only">{etiqueta ?? 'Volver'}</span>
        </>
    );

    return href ? (
        <Link href={href} className={clases}>
            {contenido}
        </Link>
    ) : (
        <button type="button" onClick={onClick} className={clases}>
            {contenido}
        </button>
    );
}

/** El nombre del sistema en dos niveles, sobre el panel azul. */
function Sistema({ sistema, className }) {
    return (
        <div className={className}>
            <p className="text-sm font-semibold text-white">{sistema.nombre}</p>
            {sistema.bajada && <p className="text-xs text-white/70">{sistema.bajada}</p>}
        </div>
    );
}

/**
 * El marco de todas las pantallas con sesión, y trae el toast
 * (`AvisoFlotante`). Lo propio del sistema llega resuelto: las `secciones` ya
 * filtradas por rol, con su `href` y si están `activa`; el `usuario` y los
 * `enlaces` de su menú. Cada sistema lo envuelve en su `AppLayout`, así sus
 * páginas pasan sólo `titulo`, `subtitulo` y `ancho`.
 *
 * Se arma como `MarcoPortal`, con un panel `primary-dark` liso: el del equipo
 * es una herramienta, sin el degradado del paciente. El panel lleva el logo, el
 * `sistema` (`{ nombre, bajada }`) debajo, las secciones (lo único que se
 * desplaza) y, fijo al pie, «Modo oscuro». En el celular, todo eso cuelga de la
 * cabecera. El título va arriba del contenido, en una `CabeceraSeccion`.
 *
 * Una ficha de detalle suma `volver` (un href, una función si no navega, o
 * `{ href | onClick, etiqueta }` para nombrar el destino), que va a la izquierda
 * de la cabecera con su etiqueta, y su título va sin mayúscula, porque es un
 * nombre. `estado` es un nodo junto al título. `migas` es una ruta que la
 * página pasa a mano, `[{ etiqueta, href | onClick }]`, y sólo se ve en
 * escritorio.
 */
export default function MarcoApp({
    titulo = 'Inicio',
    subtitulo = null,
    ancho = 'completo',
    volver = null,
    estado = null,
    migas = null,
    secciones = [],
    inicio = '/',
    sistema = null,
    usuario = null,
    enlaces = [],
    salir = null,
    children,
}) {
    const { abierto, abrir, cerrar, menuRef, botonRef } = useMenuLateral();

    const botonMenu = (
        <button
            type="button"
            ref={botonRef}
            onClick={abierto ? cerrar : abrir}
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-canvas text-primary hover:bg-gray-100 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10 lg:hidden"
            aria-expanded={abierto}
            aria-controls="menu-app"
            aria-label={abierto ? 'Cerrar el menú' : 'Abrir el menú'}
        >
            <Icono nombre={abierto ? 'close' : 'menu'} className="text-2xl" />
        </button>
    );

    return (
        <div className="flex min-h-screen">
            <SaltarAlContenido />
            <Head title={titulo} />

            <aside className="hidden w-64 shrink-0 bg-primary-dark lg:block dark:border-r dark:border-white/10 dark:bg-surface-dark">
                <div className="sticky top-0 flex h-screen flex-col bg-primary-dark dark:bg-surface-dark">
                    <div className="flex shrink-0 items-center border-b border-white/10 px-6 py-3">
                        <div className="flex min-h-12 items-center">
                            <Link href={inicio} className="block w-36 shrink-0">
                                <ApplicationLogo variante="blanco" className="h-auto w-full" />
                            </Link>
                        </div>
                    </div>

                    {sistema && <Sistema sistema={sistema} className="shrink-0 px-6 pb-1 pt-5" />}

                    <SeccionesDelMenu secciones={secciones} className="min-h-0 flex-1 overflow-y-auto px-3 py-4" />

                    <div className="shrink-0 border-t border-white/10 px-3 py-3">
                        <InterruptorTema tamano="app" />
                    </div>
                </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="sticky top-0 z-dropdown border-b border-gray-100 bg-white px-4 py-3 dark:border-gray-800 dark:bg-surface-dark sm:px-6">
                    {/* `min-h-12`: el alto del logo, así la cabecera mide lo mismo que la zona del logo del panel (73 px). */}
                    <div className="flex min-h-12 items-center gap-4">
                        {volver ? <BotonVolver volver={volver} /> : botonMenu}

                        <div className="min-w-0 flex-1">{migas && <Migas migas={migas} />}</div>

                        {/* Centrado en la cabecera y no entre los botones, que pueden ser dos a la derecha. */}
                        <ApplicationLogo className="pointer-events-none absolute left-1/2 h-auto w-36 -translate-x-1/2 lg:hidden" />

                        <div className="flex shrink-0 items-center gap-2">
                            {volver && botonMenu}
                            {usuario && <MenuDeUsuario usuario={usuario} enlaces={enlaces} salir={salir} />}
                        </div>
                    </div>

                    {/* El fondo cubre el contenido bajo la cabecera y cierra el menú al tocarlo; el menú va encima por venir después. */}
                    {abierto && (
                        <div aria-hidden="true" onClick={cerrar} className="absolute inset-x-0 top-full z-dropdown h-[100dvh] bg-primary-dark/50 lg:hidden" />
                    )}

                    {abierto && (
                        <div
                            id="menu-app"
                            ref={menuRef}
                            className="absolute inset-x-0 top-full z-dropdown max-h-[calc(100dvh-73px)] animate-menu-in overflow-y-auto overscroll-contain border-b border-white/10 bg-primary-dark px-3 pb-3 pt-4 dark:bg-surface-dark lg:hidden"
                        >
                            {sistema && <Sistema sistema={sistema} className="px-3 pb-3" />}
                            <SeccionesDelMenu secciones={secciones} onNavegar={cerrar} />
                            <div className="mt-3 border-t border-white/10 pt-3">
                                <InterruptorTema tamano="app" />
                            </div>
                        </div>
                    )}
                </header>

                {/* Entra con fade al cambiar de página; una visita a la misma (un filtro) no lo repite. */}
                {/* Con el menú abierto en el celular el resto no responde. En React 18 `inert` pasa como
                    string; con React 19 es un booleano. */}
                <main
                    id="contenido"
                    tabIndex={-1}
                    inert={abierto ? '' : undefined}
                    className="flex-1 animate-fade-in p-4 focus:outline-none sm:p-6"
                >
                    <div className={ANCHOS[ancho] ?? ANCHOS.completo}>
                        <AvisoFlotante />
                        <CabeceraSeccion titulo={titulo} subtitulo={subtitulo} estado={estado} mayuscula={! volver} />
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
