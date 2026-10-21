import Campo, { claseControl, descritoPor } from './Campo.jsx';

export default function Textarea({
    nombre,
    etiqueta = null,
    valor = '',
    onChange = null,
    ayuda = null,
    error = null,
    requerido = false,
    id = null,
    filas = 3,
    className = '',
    ...props
}) {
    const idCampo = id ?? nombre;

    return (
        <Campo id={idCampo} etiqueta={etiqueta} ayuda={ayuda} error={error} requerido={requerido}>
            <textarea
                id={idCampo}
                name={nombre}
                rows={filas}
                value={valor ?? ''}
                onChange={onChange}
                required={requerido}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={descritoPor(idCampo, error, ayuda)}
                className={`${claseControl(!!error)} ${className}`}
                {...props}
            />
        </Campo>
    );
}
