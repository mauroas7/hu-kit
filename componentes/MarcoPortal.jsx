import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from './ApplicationLogo.jsx';
import AvisoFlotante from './AvisoFlotante.jsx';
import Icono from './Icono.jsx';
import MenuDeUsuario from './MenuDeUsuario.jsx';
import SaltarAlContenido from './SaltarAlContenido.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import useMenuLateral from './useMenuLateral.js';

const CLASES_ACCION =
    'mb-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 text-base font-semibold text-primary transition-colors hover:bg-secondary-light';

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
 * El marco del paciente. Se arma igual que `MarcoApp` —panel azul a todo el
 * alto, unido de forma recta al contenido, sin tarjeta ni sombra—: lo que
 * cambia es lo que lleva el panel. Acá no hay lista de secciones del personal
 * sino lo que el sistema le pase: una `accion` principal (`{ etiqueta, icono,
 * href | onClick }`) y la `navegacion`, un nodo; `SeccionesDelMenu
 * tamano="portal"` sirve para armarla. `encabezado` es el nodo del sistema
 * (volver, logo, ruta); `pie` es una franja clara, `barraInferior` queda fija
 * abajo en el celular y `conTema` muestra el interruptor de claro/oscuro. Sin
 * `navegacion` no hay panel ni botón de menú.
 */
export default function MarcoPortal({
    titulo = 'Inicio',
    usuario = null,
    enlaces = [],
    salir = null,
    inicio = null,
    encabezado = null,
    navegacion = null,
    accion = null,
    barraInferior = null,
    pie = null,
    conTema = false,
    children,
}) {
    const { abierto, abrir, cerrar, menuRef, botonRef } = useMenuLateral();

    // Con el menú abierto en el celular el resto no responde. En React 18 `inert` pasa como string.
    const inerte = abierto ? '' : undefined;
    const logo = <ApplicationLogo variante="blanco" className="h-auto w-full" />;

    return (
        <div className="flex min-h-screen bg-canvas dark:bg-canvas-dark">
            <SaltarAlContenido />
            <Head title={titulo} />

            {navegacion && (
                <aside className="hidden w-72 shrink-0 bg-primary lg:block">
                    <div className="sticky top-0 max-h-screen overflow-y-auto p-5 xl:p-6">
                        {/* Un `a` común: el inicio es otro sistema. Fuera del teclado, porque el encabezado ya trae la vuelta. */}
                        {inicio ? (
                            <a href={inicio} tabIndex={-1} aria-hidden="true" className="mb-4 block h-auto w-44 shrink-0 px-2">
                                {logo}
                            </a>
                        ) : (
                            <div className="mb-4 block h-auto w-44 shrink-0 px-2">{logo}</div>
                        )}

                        {accion && <Accion {...accion} />}
                        {navegacion}
                    </div>
                </aside>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="border-b border-gray-100 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-surface-dark sm:px-5 lg:px-8">
                    <div className="flex items-center justify-between gap-4">
                        {encabezado ?? (
                            <h1 className="titulo-corto min-w-0 flex-1 text-base text-primary dark:text-gray-100">{titulo}</h1>
                        )}

                        <div className="flex items-center gap-2">
                            {conTema && <ThemeToggle />}

                            {navegacion && (
                                <button
                                    type="button"
                                    ref={botonRef}
                                    onClick={abierto ? cerrar : abrir}
                                    className="flex size-11 items-center justify-center rounded-xl bg-canvas text-primary hover:bg-gray-100 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10 lg:hidden"
                                    aria-expanded={abierto}
                                    aria-controls="menu-portal"
                                    aria-label={abierto ? 'Cerrar el menú' : 'Abrir el menú'}
                                >
                                    <Icono nombre={abierto ? 'close' : 'menu'} className="text-2xl" />
                                </button>
                            )}

                            {usuario && <MenuDeUsuario usuario={usuario} enlaces={enlaces} salir={salir} />}
                        </div>
                    </div>
                </header>

                {abierto && navegacion && (
                    // Una sección con `onClick` cambia lo que se muestra sin navegar: el menú se cierra al elegir.
                    <div
                        id="menu-portal"
                        ref={menuRef}
                        onClick={(e) => e.target.closest('a[href], button') && cerrar()}
                        className="border-b border-white/10 bg-primary p-3 lg:hidden"
                    >
                        {accion && <Accion {...accion} />}
                        {navegacion}
                    </div>
                )}

                <main
                    id="contenido"
                    tabIndex={-1}
                    inert={inerte}
                    className={`w-full flex-1 p-4 focus:outline-none sm:p-5 lg:p-8 ${barraInferior ? 'pb-28 lg:pb-8' : ''}`}
                >
                    {children}
                </main>

                {pie && (
                    <footer inert={inerte} className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-surface-dark">
                        {pie}
                    </footer>
                )}
            </div>

            {barraInferior && (
                <div data-barra-inferior className="fixed inset-x-3 bottom-3 z-dropdown lg:hidden">
                    {barraInferior}
                </div>
            )}

            <AvisoFlotante className={barraInferior ? 'inset-x-3 bottom-24 lg:inset-x-auto lg:bottom-6 lg:right-6' : undefined} />
        </div>
    );
}
