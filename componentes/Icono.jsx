/**
 * Material Symbols, como indica el Manual de Marca.
 *
 * El nombre es el de fonts.google.com/icons — por ejemplo "event". El eje FILL
 * alterna trazo (0) y relleno (1): el manual pide relleno para la sección en la
 * que estás parado y trazo para el resto.
 */
export default function Icono({ nombre, relleno = false, className = '', ...props }) {
    return (
        <span
            {...props}
            aria-hidden="true"
            className={`material-symbols-outlined ${relleno ? 'relleno' : ''} ${className}`}
        >
            {nombre}
        </span>
    );
}
