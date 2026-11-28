import Estado from './Estado.jsx';
import Rotulo from './Rotulo.jsx';

/** El marco de toda tarjeta de la aplicación, también las del portal. */
export const marcoTarjeta =
    'rounded-2xl border border-brandText-soft/70 bg-white shadow-sm dark:border-gray-800 dark:bg-surface-dark';

/**
 * El contenedor de contenido. `contador` va pegado al título y `acciones`, a la
 * derecha. El cuerpo ocupa todo el alto, para que el pie de tarjetas vecinas
 * quede parejo; `relleno={false}` lo lleva hasta el borde.
 */
export default function Tarjeta({
    id = undefined,
    titulo = null,
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
                <header className="flex min-h-[61px] flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-brandText-soft/70 px-5 py-2 dark:border-gray-800">
                    <div className="flex min-w-0 items-center gap-2">
                        {titulo && <Rotulo como="h2">{titulo}</Rotulo>}
                        {contador !== null && <Estado tono={tonoContador}>{contador}</Estado>}
                    </div>

                    {acciones && <div className="ml-auto flex flex-wrap items-center gap-2">{acciones}</div>}
                </header>
            )}

            <div className={relleno ? 'flex-1 px-5 py-4' : 'flex-1'}>{children}</div>
        </section>
    );
}
