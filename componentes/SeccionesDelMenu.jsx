import { Link } from '@inertiajs/react';
import Icono from './Icono.jsx';

const CLASES_PORTAL =
    'group relative flex min-h-12 w-full items-center gap-3 rounded-2xl px-2 py-2 text-left text-base leading-snug transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary';
const CLASES_PORTAL_ACTIVO =
    'bg-gradient-to-b from-white/15 to-white/5 font-semibold text-white ring-1 ring-inset ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_12px_28px_-14px_rgba(0,0,0,0.7)]';
const CLASES_PORTAL_INACTIVO = 'text-white/80 hover:bg-white/5 hover:text-white';
const CIRCULO = 'flex size-9 shrink-0 items-center justify-center rounded-full';
const CIRCULO_ACTIVO = 'bg-white text-primary shadow-[0_2px_8px_-2px_rgba(0,0,0,0.5)]';
const CIRCULO_INACTIVO = 'bg-white/5 text-white/85 ring-1 ring-inset ring-white/15';

/**
 * Las secciones de un menú sobre fondo azul. Un ítem es `{ etiqueta, icono,
 * href?, onClick?, activa?, titulo?, externo? }`: con `href` navega, con
 * `onClick` es un botón, y sin ninguno queda atenuado: todavía no tiene
 * pantalla. `externo` es el sistema al que sale (`'QuirofanoHU'`): un `a` común
 * que lo anuncia. `tamano="portal"` es para el paciente: filas más altas, con
 * el ícono en un círculo. `titulo` abre un grupo con un rótulo.
 */
export default function SeccionesDelMenu({ secciones, onNavegar, etiqueta = 'Secciones', tamano = 'app', className = '' }) {
    const portal = tamano === 'portal';

    return (
        <nav className={`space-y-1 ${className}`} aria-label={etiqueta}>
            {secciones.map((seccion, indice) => {
                const clases = portal
                    ? `${CLASES_PORTAL} ${seccion.activa ? CLASES_PORTAL_ACTIVO : CLASES_PORTAL_INACTIVO}`
                    : `group flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        seccion.activa
                            ? 'bg-white/10 font-semibold text-white'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`;
                const alElegir = () => {
                    seccion.onClick?.();
                    onNavegar?.();
                };
                const externo = seccion.externo && <span className="sr-only"> (abre {seccion.externo})</span>;
                const contenido = portal ? (
                    <>
                        {/* Relleno para la sección activa, trazo para el resto (Manual de Marca). */}
                        <span className={`${CIRCULO} ${seccion.activa ? CIRCULO_ACTIVO : CIRCULO_INACTIVO}`}>
                            <Icono nombre={seccion.icono} relleno={seccion.activa} className="text-xl" />
                        </span>
                        <span className="min-w-0 flex-1">
                            {seccion.etiqueta}
                            {externo}
                        </span>
                        {seccion.externo && <Icono nombre="open_in_new" className="mr-1 text-[18px] text-white/60" />}
                    </>
                ) : (
                    <>
                        <Icono
                            nombre={seccion.icono}
                            relleno={seccion.activa}
                            className="text-xl transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                        <span>
                            {seccion.etiqueta}
                            {externo}
                        </span>

                        {seccion.activa && (
                            <span className="ml-auto h-5 w-1 rounded-full bg-secondary" aria-hidden="true" />
                        )}
                        {seccion.externo && <Icono nombre="open_in_new" className="ml-auto mr-1 text-[18px] text-white/60" />}
                    </>
                );

                return (
                    <div key={`${seccion.href ?? seccion.etiqueta}-${indice}`}>
                        {seccion.titulo && portal && (
                            <h2
                                className={`px-2 pb-2 ${indice === 0 ? 'pt-1' : 'pt-6'} text-xs font-semibold uppercase tracking-[0.15em] text-white/60`}
                            >
                                {seccion.titulo}
                            </h2>
                        )}
                        {seccion.titulo && ! portal && (
                            <>
                                <hr className="my-3 border-white/10" aria-hidden="true" />
                                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                                    {seccion.titulo}
                                </p>
                            </>
                        )}

                        {seccion.externo ? (
                            <a href={seccion.href} onClick={onNavegar} className={clases}>
                                {contenido}
                            </a>
                        ) : seccion.href ? (
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
                        ) : portal ? (
                            <span className={`${CLASES_PORTAL} cursor-not-allowed text-white/35`} title="Todavía no implementado">
                                <span className={`${CIRCULO} ${CIRCULO_INACTIVO}`}>
                                    <Icono nombre={seccion.icono} className="text-xl" />
                                </span>
                                <span className="min-w-0 flex-1">{seccion.etiqueta}</span>
                            </span>
                        ) : (
                            <span
                                className="flex min-h-11 cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/35"
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
