import { Boton } from '../../componentes/index.js';
import { href } from '../datos.js';
import Muestra from '../Muestra.jsx';

const VARIANTES = ['primario', 'secundario', 'exito', 'peligro', 'contorno', 'contornoPeligro', 'contornoExito', 'fantasma', 'fantasmaPeligro', 'fantasmaExito'];

export default function Botones() {
    return (
        <div className="space-y-6">
            <Muestra
                nombre="Boton forma='confirmacion'"
                uso="Redondo del todo: envía un formulario o cierra una acción. Es la forma por defecto."
            >
                {VARIANTES.map((variante) => (
                    <Boton key={variante} tipo="button" variante={variante}>
                        {variante}
                    </Boton>
                ))}
            </Muestra>

            <Muestra nombre="Boton forma='grupo'" uso="Esquinas de 12 px: navega, elige o alterna entre varias opciones, como las acciones de una fila.">
                {VARIANTES.map((variante) => (
                    <Boton key={variante} tipo="button" variante={variante} forma="grupo">
                        {variante}
                    </Boton>
                ))}
            </Muestra>

            <Muestra nombre="Boton tamano" uso="El tamaño va por la prop y no por className. «tactil» mide 44 px de alto, para las pantallas que se usan con el dedo.">
                <Boton tipo="button" icono="save">normal</Boton>
                <Boton tipo="button" tamano="tactil" icono="save">tactil</Boton>
                <Boton tipo="button" tamano="compacto" icono="save">compacto</Boton>
                <Boton tipo="button" tamano="icono" icono="edit" aria-label="Editar" />
                <Boton tipo="button" tamano="iconoCompacto" icono="edit" aria-label="Editar" />
                <Boton tipo="button" tamano="ingreso" className="w-64">Ingresar</Boton>
            </Muestra>

            <Muestra nombre="Boton href · disabled" uso="Con href es un enlace de Inertia; con href y externo, un enlace común (una descarga). Deshabilitado baja la opacidad y no responde.">
                <Boton href={href('inicio')} variante="contorno" forma="grupo" icono="arrow_back">Enlace</Boton>
                <Boton href="#" externo variante="contorno" forma="grupo" icono="download">Descargar PDF</Boton>
                <Boton tipo="button" disabled>Deshabilitado</Boton>
            </Muestra>
        </div>
    );
}
