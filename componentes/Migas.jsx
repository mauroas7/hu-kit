import { Fragment } from 'react';
import { Link } from '@inertiajs/react';
import Icono from './Icono.jsx';

/**
 * La ruta de la cabecera de los marcos, sólo en escritorio: cada miga menos la
 * última lleva de vuelta. Una miga es `{ etiqueta, href | onClick, externo }`;
 * `externo` sale a otro sistema con un `a` común, sin visita de Inertia.
 */
export default function Migas({ migas }) {
    const clases = 'inline-flex min-h-11 items-center hover:underline';

    return (
        <nav aria-label="Ruta de navegación" className="hidden lg:flex">
            <ol className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                {migas.map((miga, indice) =>
                    indice === migas.length - 1 ? (
                        <li key={miga.etiqueta}>
                            <span aria-current="page" className="inline-flex min-h-11 items-center font-semibold text-primary dark:text-gray-100">
                                {miga.etiqueta}
                            </span>
                        </li>
                    ) : (
                        <Fragment key={miga.etiqueta}>
                            <li>
                                {miga.href && miga.externo ? (
                                    <a href={miga.href} className={clases}>
                                        {miga.etiqueta}
                                    </a>
                                ) : miga.href ? (
                                    <Link href={miga.href} className={clases}>
                                        {miga.etiqueta}
                                    </Link>
                                ) : miga.onClick ? (
                                    <button type="button" onClick={miga.onClick} className={clases}>
                                        {miga.etiqueta}
                                    </button>
                                ) : (
                                    <span className="inline-flex min-h-11 items-center">{miga.etiqueta}</span>
                                )}
                            </li>
                            <li aria-hidden="true">
                                <Icono nombre="chevron_right" className="text-base" />
                            </li>
                        </Fragment>
                    ),
                )}
            </ol>
        </nav>
    );
}
