import { useTheme } from './useTheme.jsx';
import logoDiario from './img/logo-hu.svg';
import logoBlanco from './img/logo-hu-blanco.svg';

/*
 * Isologotipo institucional: 'diario' para fondos claros, 'blanco' para los
 * oscuros. Es el único lugar que sabe qué archivo va con cada fondo.
 *
 * La variante *Institucional* no se expone: es sólo para documentos formales.
 */
const VARIANTES = {
    diario: logoDiario,
    blanco: logoBlanco,
};

export default function ApplicationLogo({ variante = 'diario', className = '', ...props }) {
    const { theme } = useTheme();

    // 'diario' significa "el que corresponde al fondo de la app", y en oscuro
    // ése es el blanco. Un 'blanco' pedido a mano se respeta: ya está sobre
    // `primary`.
    const efectiva = variante === 'diario' && theme === 'dark' ? 'blanco' : variante;

    return (
        <img
            {...props}
            src={VARIANTES[efectiva] ?? VARIANTES.diario}
            alt="Hospital Universitario"
            className={className}
        />
    );
}
