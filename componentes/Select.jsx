import Campo, { claseControl } from './Campo.jsx';

/**
 * Desplegable controlado.
 *
 * `opciones` es un mapa plano `{ valor: etiqueta }`: quien lo llama aplana
 * antes, porque el componente no sabe recorrer objetos.
 *
 * `vacio={false}` saca la opción vacía, para las listas con valor por defecto.
 */
export default function Select({
    nombre,
    etiqueta = null,
    opciones = {},
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

                {Object.entries(opciones).map(([clave, texto]) => (
                    <option key={clave} value={clave}>
                        {texto}
                    </option>
                ))}
            </select>
        </Campo>
    );
}
