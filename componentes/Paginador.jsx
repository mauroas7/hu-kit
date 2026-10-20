import { useRef } from 'react';
import { Link } from '@inertiajs/react';
import Icono from './Icono.jsx';

/**
 * La paginación de los listados.
 *
 * Recibe el paginador de Laravel tal como lo serializa Inertia y dibuja una
 * ventana de dos páginas a cada lado de la actual.
 */
const CELDA = 'flex size-9 items-center justify-center rounded-full';

/**
 * Cambiar de página no sube al tope de la pantalla: deja el comienzo de esta
 * lista a la vista, que puede ser la tercera de la página (el panel del
 * cirujano tiene tres). Si ya se ve, no mueve nada.
 */
function alComienzoDeLaLista(nav) {
    const lista = nav?.closest('section');
    if (! lista) return;

    const cabecera = document.querySelector('header')?.offsetHeight ?? 0;
    const { top } = lista.getBoundingClientRect();

    if (top < cabecera) window.scrollBy({ top: top - cabecera - 16, behavior: 'smooth' });
}

function Flecha({ url, etiqueta, rotar = false, alNavegar }) {
    const icono = <Icono nombre="arrow_back" className={`text-lg ${rotar ? 'rotate-180' : ''}`} />;

    if (!url) {
        return (
            <span className={`${CELDA} text-brandText-soft`} aria-hidden="true">
                {icono}
            </span>
        );
    }

    return (
        <Link
            href={url}
            aria-label={etiqueta}
            preserveScroll
            preserveState
            onSuccess={alNavegar}
            className={`${CELDA} text-primary transition-colors hover:bg-primary-faint dark:text-gray-100 dark:hover:bg-white/5`}
        >
            {icono}
        </Link>
    );
}

export default function Paginador({ paginador }) {
    const nav = useRef(null);

    if (!paginador || paginador.last_page <= 1) return null;

    const alNavegar = () => alComienzoDeLaLista(nav.current);

    const actual = paginador.current_page;
    const desde = Math.max(1, actual - 2);
    const hasta = Math.min(paginador.last_page, actual + 2);

    const paginas = [];
    for (let n = desde; n <= hasta; n++) paginas.push(n);

    // La URL la arma Laravel: cada lista tiene su parámetro (`proximas`,
    // `pendientes`…), y un `?page=` fijo no movía ninguna de esas.
    const urlDePagina = (n) => paginador.links?.find((enlace) => enlace.page === n)?.url;

    return (
        <nav
            ref={nav}
            className="flex flex-wrap items-center justify-between gap-3 border-t border-brandText-soft/70 pt-4 dark:border-gray-800"
            aria-label="Paginación"
        >
            <p className="text-xs text-brandText-muted dark:text-brandText-mutedDark">
                Mostrando {paginador.from}–{paginador.to} de {paginador.total}
            </p>

            <div className="flex items-center gap-1">
                <Flecha url={paginador.prev_page_url} etiqueta="Página anterior" alNavegar={alNavegar} />

                {paginas.map((n) => (
                    <Link
                        key={n}
                        href={urlDePagina(n)}
                        preserveScroll
                        preserveState
                        onSuccess={alNavegar}
                        aria-current={n === actual ? 'page' : undefined}
                        className={`${CELDA} text-sm font-semibold transition-colors ${
                            n === actual
                                ? 'bg-primary text-white'
                                : 'text-primary hover:bg-primary-faint dark:text-gray-100 dark:hover:bg-white/5'
                        }`}
                    >
                        {n}
                    </Link>
                ))}

                <Flecha url={paginador.next_page_url} etiqueta="Página siguiente" rotar alNavegar={alNavegar} />
            </div>
        </nav>
    );
}
