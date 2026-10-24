import { Tarjeta } from '../componentes/index.js';

/** Una pieza del catálogo: su nombre, para qué sirve y cómo se ve. */
export default function Muestra({ nombre, children, uso = null, columna = false, className = '' }) {
    return (
        <Tarjeta titulo={<code className="font-semibold">{nombre}</code>} className={className}>
            {uso && <p className="mb-4 max-w-3xl text-sm text-brandText dark:text-brandText-dark">{uso}</p>}
            <div className={columna ? 'space-y-4' : 'flex flex-wrap items-start gap-3'}>{children}</div>
        </Tarjeta>
    );
}
