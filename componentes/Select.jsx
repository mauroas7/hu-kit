import Campo, { claseControl } from './Campo.jsx';

/**
 * Desplegable controlado. `opciones` son pares `[valor, etiqueta]`, en el orden
 * en que se muestran; un mapa `{ valor: etiqueta }` sirve si las claves no son
 * números, porque JavaScript ordena las claves numéricas de menor a mayor.
 *
 * `vacio={false}` saca la opción vacía, para las listas con valor por defecto.
 */
export default function Select({
    nombre,
    etiqueta = null,
    opciones = [],
    valor = '',
    onChange = null,
    ayuda = null,
    error = null,
    requerido = false,
    vacio = 'Elegí una opción',
    id = null,
    className = '',
    ...props
}) {
    const idCampo = id ?? nombre;
    const pares = Array.isArray(opciones) ? opciones : Object.entries(opciones);

    return (
        <Campo id={idCampo} etiqueta={etiqueta} ayuda={ayuda} error={error} requerido={requerido}>
            <select
                id={idCampo}
                name={nombre}
                value={valor ?? ''}
                onChange={onChange}
                required={requerido}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? `${idCampo}-error` : undefined}
                className={`${claseControl(!!error)} ${className}`}
                {...props}
            >
                {vacio && <option value="">{vacio}</option>}

                {pares.map(([clave, texto]) => (
                    <option key={clave} value={clave}>
                        {texto}
                    </option>
                ))}
            </select>
        </Campo>
    );
}
