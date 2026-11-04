import AvisoFlotante from './AvisoFlotante.jsx';

/**
 * Ahora es el mismo toast que `AvisoFlotante`. Sigue existiendo porque
 * `MarcoApp` y las pantallas de ingreso lo montan por este nombre, y quitarlo
 * rompería a los sistemas que ya lo importan.
 */
export default function Flash(props) {
    return <AvisoFlotante {...props} />;
}
