import { Link } from '@inertiajs/react';
import Icono from './Icono.jsx';

const ALTOS = {
    app: 'min-h-11 text-sm',
    portal: 'min-h-12 text-base',
};

/**
 * Las secciones de un menú sobre fondo azul. Un ítem es `{ etiqueta, icono,
 * href?, onClick?, activa?, titulo? }`: con `href` navega, con `onClick` es un
 * botón (el que cambia lo que se muestra sin visitar), y sin ninguno queda
 * atenuado y no hace nada: todavía no tiene pantalla. `tamano="portal"` es para
 * el paciente, con ítems más altos.
 */
export default function SeccionesDelMenu({ secciones, onNavegar, etiqueta = 'Secciones', tamano = 'app', className = '' }) {
    const alto = ALTOS[tamano] ?? ALTOS.app;

    return (
        <nav className={`space-y-1 ${className}`} aria-label={etiqueta}>
            {secciones.map((seccion, indice) => {
                const clases = `group flex ${alto} items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                    seccion.activa
                        ? 'bg-white/10 font-semibold text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`;
                const alElegir = () => {
                    seccion.onClick?.();
                    onNavegar?.();
                };
                const contenido = (
                    <>
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
                    </>
                );

                return (
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
                                onClick={alElegir}
                                aria-current={seccion.activa ? 'page' : undefined}
                                className={clases}
                            >
                                {contenido}
                            </Link>
                        ) : seccion.onClick ? (
                            <button
                                type="button"
                                onClick={alElegir}
                                aria-current={seccion.activa ? 'page' : undefined}
                                className={`${clases} w-full text-left`}
                            >
                                {contenido}
                            </button>
                        ) : (
                            <span
                                className={`flex ${alto} cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-white/35`}
                                title="Todavía no implementado"
                            >
                                <Icono nombre={seccion.icono} className="text-xl" />
                                <span>{seccion.etiqueta}</span>
                            </span>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
