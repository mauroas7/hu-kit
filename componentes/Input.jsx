import Campo, { claseControl } from './Campo.jsx';

/**
 * Campo de texto controlado: el valor y el error son del `useForm` que los
 * pidió, así que no hay nada global que esquivar.
 */
export default function Input({
    nombre,
    etiqueta = null,
    tipo = 'text',
    valor = '',
    onChange = null,
    ayuda = null,
    error = null,
    requerido = false,
    id = null,
    variante = 'normal',
    className = '',
    ...props
}) {
    const idCampo = id ?? nombre;

    return (
        <Campo id={idCampo} etiqueta={etiqueta} ayuda={ayuda} error={error} requerido={requerido} variante={variante}>
            <input
                id={idCampo}
                name={nombre}
                type={tipo}
                // Un input file no lleva value: el navegador lo ignora.
                {...(tipo === 'file' ? {} : { value: valor ?? '' })}
                onChange={onChange}
                required={requerido}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? `${idCampo}-error` : undefined}
                className={`${claseControl(!!error, variante)} ${className}`}
                {...props}
            />
        </Campo>
    );
}
