/**
 * El texto chico en mayúsculas que nombra lo que sigue: el subtítulo de un
 * bloque dentro de una tarjeta (`como="h3"`) o la etiqueta de un dato.
 * `linea` lo continúa con una raya hasta el borde, para separar grupos;
 * `sobrePrimario`, en dorado claro para un fondo `primary`. `tono="texto"`
 * lo lleva al gris del texto, como lo pide el portal de pacientes.
 */
export default function Rotulo({ como: Elemento = 'span', linea = false, sobrePrimario = false, tono = 'apagado', className = '', children }) {
    const raya = linea
        ? 'flex items-center gap-3 after:h-px after:flex-1 after:bg-brandText-soft/60 dark:after:bg-gray-800'
        : '';

    const color = sobrePrimario
        ? 'text-secondary-light'
        : tono === 'texto'
          ? 'text-brandText dark:text-brandText-dark'
          : 'text-brandText-muted dark:text-brandText-mutedDark';

    return (
        <Elemento className={`text-xs font-semibold uppercase tracking-widest ${color} ${raya} ${className}`}>
            {children}
        </Elemento>
    );
}
