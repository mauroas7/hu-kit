import Campo from './Campo.jsx';

/**
 * Casilla de verificación controlada.
 *
 * Sin `<input type="hidden">`: una casilla sin marcar no viaja en el POST de
 * un formulario HTML, pero `useForm` manda el booleano siempre.
 */
export default function Checkbox({
    nombre,
    etiqueta = null,
    valor = false,
    onChange = null,
    ayuda = null,
    error = null,
    id = null,
    className = '',
    ...props
}) {
    const idCampo = id ?? nombre;

    return (
        <Campo id={idCampo} ayuda={ayuda} error={error}>
            <label
                htmlFor={idCampo}
                className="flex items-start gap-2.5 text-sm text-brandText dark:text-brandText-dark"
            >
                <input
                    id={idCampo}
                    name={nombre}
                    type="checkbox"
                    checked={!!valor}
                    onChange={onChange}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={error ? `${idCampo}-error` : undefined}
                    className={`mt-0.5 ${claseCasilla(!!error)} ${className}`}
                    {...props}
                />

                <span className="font-semibold text-primary dark:text-gray-100">{etiqueta}</span>
            </label>
        </Campo>
    );
}

/**
 * La clase de la casilla en sí, también para un radio (`forma` 'rounded-full') o
 * con otro color (`tono`). En oscuro, sin marcar lleva el fondo de los campos y
 * marcada conserva el relleno; el foco no deja un halo blanco.
 */
export function claseCasilla(hayError, forma = 'rounded', tono = 'text-primary focus:ring-primary') {
    return [
        `size-4 shrink-0 ${forma} border bg-white ${tono}`,
        'dark:bg-canvas-dark dark:checked:bg-current dark:focus:ring-offset-surface-dark',
        hayError ? 'border-red-600' : 'border-brandText-soft dark:border-gray-700 dark:checked:border-transparent',
    ].join(' ');
}
