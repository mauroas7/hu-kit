import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from './ApplicationLogo.jsx';
import Flash from './Flash.jsx';
import Icono from './Icono.jsx';
import MenuDeUsuario from './MenuDeUsuario.jsx';
import ThemeToggle from './ThemeToggle.jsx';

/*
 * `completo` es para las pantallas de datos —listados, agenda, tableros—, que
 * aprovechan todo el ancho. `lectura` es para formularios y documentos: los
 * mantiene en 1152 px para que los renglones no se estiren en pantallas anchas.
 * `formulario`, en 768 px, un formulario de una sola columna de tarjetas. Los
 * dos arrancan a la izquierda, alineados con el título de la cabecera.
 */
const ANCHOS = {
    completo: '',
    lectura: 'max-w-6xl',
    formulario: 'max-w-3xl',
};

/** El menú lateral. Una sección sin `href` queda atenuada y no navega: todavía no tiene pantalla. */
function Nav({ secciones, onNavegar }) {
    return (
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Secciones">
            {secciones.map((seccion, indice) => (
                <div key={`${seccion.href ?? seccion.etiqueta}-${indice}`}>
                    {seccion.titulo && (
                        <>
                            <hr className="my-3 border-white/10" aria-hidden="true" />
                            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                                {seccion.titulo}
                            </p>
                        </>
                    )}

                    {seccion.href ? (
                        <Link
                            href={seccion.href}
                            onClick={onNavegar}
                            aria-current={seccion.activa ? 'page' : undefined}
                            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                                seccion.activa
                                    ? 'bg-white/10 font-semibold text-white'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            {/* Relleno para la sección activa, trazo para el resto (Manual de Marca). */}
                            <Icono
                                nombre={seccion.icono}
                                relleno={seccion.activa}
                                className="text-xl transition-transform duration-300 group-hover:translate-x-0.5"
                            />
                            <span>{seccion.etiqueta}</span>

                            {seccion.activa && (
                                <span className="ml-auto h-5 w-1 rounded-full bg-secondary" aria-hidden="true" />
                            )}
                        </Link>
                    ) : (
                        <span
                            className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/35"
                            title="Todavía no implementado"
                        >
                            <Icono nombre={seccion.icono} className="text-xl" />
                            <span>{seccion.etiqueta}</span>
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}

/**
 * El marco de todas las pantallas con sesión: barra lateral, encabezado y área
 * de contenido, con los avisos de `Flash` arriba. Lo propio del sistema llega
 * resuelto: las `secciones` ya filtradas por rol, con su `href` y si están
 * `activa`; el `usuario` y los `enlaces` de su menú. Cada sistema lo envuelve
 * en su `AppLayout`, así sus páginas pasan sólo `titulo`, `subtitulo` y `ancho`.
 */
export default function MarcoApp({
    titulo = 'Inicio',
    subtitulo = null,
    ancho = 'completo',
    secciones = [],
    inicio = '/',
    sistema = null,
    usuario = null,
    enlaces = [],
    salir = null,
    children,
}) {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cerrarMenu = () => setMenuAbierto(false);

    useEffect(() => {
        if (! menuAbierto) return undefined;

        const alTeclear = (e) => e.key === 'Escape' && cerrarMenu();
        document.addEventListener('keydown', alTeclear);

        return () => document.removeEventListener('keydown', alTeclear);
    }, [menuAbierto]);

    return (
        <div className="flex min-h-screen">
            <Head title={titulo} />

            {/* Barra lateral. En móvil se muestra/oculta con el botón del encabezado; cerrada,
                `invisible` la saca del orden del teclado, no sólo de la pantalla. */}
            <aside
                className={`fixed inset-y-0 left-0 z-dropdown flex w-64 flex-col bg-primary transition-[transform,visibility] lg:visible lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
                    menuAbierto ? 'visible translate-x-0' : 'invisible -translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-6">
                    <Link href={inicio} className="block min-w-0 flex-1" onClick={cerrarMenu}>
                        <ApplicationLogo variante="blanco" className="h-auto w-full" />
                    </Link>

                    <button
                        type="button"
                        onClick={cerrarMenu}
                        className="text-white/70 hover:text-white lg:hidden"
                        aria-label="Cerrar menú"
                    >
                        <Icono nombre="close" className="text-2xl" />
                    </button>
                </div>

                <Nav secciones={secciones} onNavegar={cerrarMenu} />

                {sistema && (
                    <div className="border-t border-white/10 px-5 py-4">
                        <p className="text-xs uppercase tracking-widest text-white/70">{sistema.nombre}</p>
                        {sistema.bajada && <p className="text-xs text-white/70">{sistema.bajada}</p>}
                    </div>
                )}
            </aside>

            {/* Fondo oscuro detrás del menú en móvil. */}
            {menuAbierto && (
                <div
                    onClick={cerrarMenu}
                    className="fixed inset-0 z-30 bg-primary-dark/50 lg:hidden"
                    aria-hidden="true"
                />
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="sticky top-0 z-dropdown border-b border-brandText-soft/70 bg-white dark:border-gray-800 dark:bg-surface-dark">
                    <div className="flex items-center gap-4 px-4 py-3.5 sm:px-6">
                        <button
                            type="button"
                            onClick={() => setMenuAbierto(true)}
                            className="text-primary dark:text-gray-100 lg:hidden"
                            aria-label="Abrir menú"
                            aria-expanded={menuAbierto}
                        >
                            <Icono nombre="menu" className="text-2xl" />
                        </button>

                        <div className="min-w-0 flex-1">
                            <h1 className="titulo-corto line-clamp-2 break-words text-base text-primary dark:text-gray-100">
                                {titulo}
                            </h1>
                            {subtitulo && (
                                <p className="line-clamp-2 text-xs text-brandText-muted dark:text-brandText-mutedDark">{subtitulo}</p>
                            )}
                        </div>

                        {usuario && (
                            <div className="flex items-center gap-3 sm:gap-5">
                                <ThemeToggle />

                                <div className="hidden h-8 w-px bg-brandText-soft/70 dark:bg-gray-800 sm:block" />

                                <MenuDeUsuario usuario={usuario} enlaces={enlaces} salir={salir} />
                            </div>
                        )}
                    </div>
                </header>

                {/* Entra con fade al cambiar de página; una visita a la misma (un filtro) no lo repite. */}
                <main className="flex-1 animate-fade-in px-4 py-6 sm:px-6">
                    <div className={ANCHOS[ancho] ?? ANCHOS.completo}>
                        <Flash />
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
