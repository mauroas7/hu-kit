/**
 * El título de una pantalla, con el filete dorado y el subtítulo. `children` va
 * a la derecha en escritorio y debajo en el celular: un `SelectorDeVista`, un
 * `Buscador` o un botón.
 */
export default function CabeceraSeccion({ titulo, subtitulo = null, children = null }) {
    return (
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
                <h1 className="text-2xl font-black uppercase tracking-tight text-primary dark:text-gray-100">{titulo}</h1>
                <span aria-hidden="true" className="mt-1.5 block h-[3px] w-10 rounded-full bg-secondary" />
                {subtitulo && <p className="mt-0.5 text-sm text-brandText dark:text-brandText-dark">{subtitulo}</p>}
            </div>

            {children && <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">{children}</div>}
        </div>
    );
}
