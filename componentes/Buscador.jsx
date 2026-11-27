import Campo, { claseControl, descritoPor } from './Campo.jsx';
import Icono from './Icono.jsx';

/**
 * El campo de búsqueda, con la lupa y un botón para borrar. `onChange` recibe
 * el texto, no el evento, igual que `SelectorFecha`: el botón de borrar no
 * tiene un evento que pasar. `ancho` es el del conjunto, por ejemplo
 * `'w-full lg:w-80'` en la cabecera de una sección.
 */
export default function Buscador({
    nombre = 'buscar',
    etiqueta = null,
    valor = '',
    onChange,
    placeholder = 'Buscar…',
    ayuda = null,
    error = null,
    id = null,
    ancho = 'w-full',
    className = '',
    ...props
}) {
    const idCampo = id ?? nombre;

    return (
        <Campo id={idCampo} etiqueta={etiqueta} ayuda={ayuda} error={error}>
            <div className={`relative ${ancho}`}>
                <Icono
                    nombre="search"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] leading-5 text-gray-500 dark:text-gray-400"
                />

                <input
                    id={idCampo}
                    name={nombre}
                    type="search"
                    value={valor ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    aria-label={etiqueta ? undefined : placeholder.replace('…', '')}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={descritoPor(idCampo, error, ayuda)}
                    // La cruz propia del navegador se oculta: la reemplaza el botón de borrar.
                    className={`${claseControl(!! error)} py-3 pl-11 pr-12 font-semibold placeholder:text-gray-500 dark:placeholder:text-gray-400 [&::-webkit-search-cancel-button]:appearance-none ${className}`}
                    {...props}
                />

                {valor && (
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        aria-label="Borrar la búsqueda"
                        className="absolute right-0 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-brandText-muted transition-colors hover:bg-canvas hover:text-primary dark:text-brandText-mutedDark dark:hover:bg-white/5 dark:hover:text-gray-100"
                    >
                        <Icono nombre="close" className="text-lg leading-5" />
                    </button>
                )}
            </div>
        </Campo>
    );
}
