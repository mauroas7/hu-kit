/**
 * El título de una pantalla, con el filete dorado y el subtítulo. `estado` es
 * un nodo junto al título (un `Estado`), y el renglón se parte si no entra.
 * `subtitulo` puede ser un nodo, con íconos en línea. `mayuscula={false}` es
 * para las fichas, cuyo título es un nombre. Una palabra larga sin espacios se
 * corta antes de salirse. `children` va a la derecha en escritorio y debajo en
 * el celular: un `SelectorDeVista`, un `Buscador` o un botón.
 */
export default function CabeceraSeccion({ titulo, subtitulo = null, estado = null, mayuscula = true, children = null }) {
    return (
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h1
                        className={`min-w-0 text-2xl font-black tracking-tight text-primary [overflow-wrap:anywhere] dark:text-gray-100 ${mayuscula ? 'uppercase' : ''}`}
                    >
                        {titulo}
                    </h1>
                    {estado}
                </div>
                <span aria-hidden="true" className="mt-1.5 block h-[3px] w-10 rounded-full bg-secondary" />
                {subtitulo && <p className="mt-0.5 text-sm text-brandText dark:text-brandText-dark">{subtitulo}</p>}
            </div>

            {children && <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">{children}</div>}
        </div>
    );
}
