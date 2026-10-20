import Icono from './Icono.jsx';
import Estado from './Estado.jsx';

/** El marco de toda tarjeta de la aplicación, también las del portal. */
export const marcoTarjeta =
    'rounded-2xl border border-brandText-soft/70 bg-white shadow-sm dark:border-gray-800 dark:bg-surface-dark';

/**
 * El contenedor de contenido de toda la aplicación.
 *
 * `contador` va pegado al título (cuántos hay de lo que nombra) y `acciones`, a
 * la derecha. El cuerpo ocupa todo el alto, así el pie de tarjetas vecinas en
 * una grilla queda parejo; con `relleno={false}` llega hasta el borde.
 */
export default function Tarjeta({
    id = undefined,
    titulo = null,
    icono = null,
    contador = null,
    tonoContador = 'info',
    acciones = null,
    relleno = true,
    className = '',
    children,
}) {
    return (
        <section
            id={id}
            className={`flex flex-col ${marcoTarjeta} ${className}`}
        >
            {(titulo || acciones) && (
                <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-brandText-soft/70 px-5 py-4 dark:border-gray-800">
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-primary dark:text-gray-100">
                        {icono && <Icono nombre={icono} className="text-xl text-secondary" relleno />}
                        {titulo}
                        {contador !== null && <Estado tono={tonoContador}>{contador}</Estado>}
                    </h2>

                    {acciones && <div className="ml-auto flex flex-wrap items-center gap-2">{acciones}</div>}
                </header>
            )}

            <div className={relleno ? 'flex-1 px-5 py-4' : 'flex-1'}>{children}</div>
        </section>
    );
}
