import { Boton } from '../../componentes/index.js';
import { href } from '../datos.js';
import Muestra from '../Muestra.jsx';

const VARIANTES = ['primario', 'secundario', 'exito', 'peligro', 'contorno', 'contornoPeligro', 'contornoExito', 'suave', 'fantasma', 'fantasmaPeligro', 'fantasmaExito'];

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

            <Muestra
                nombre="Boton tamano='portal'"
                uso="Los botones del portal de pacientes: táctil, en mayúsculas. Un enlace que no puede ser un Boton lleva las mismas clases con claseBoton({ variante, forma, tamano })."
            >
                <Boton tipo="button" forma="grupo" tamano="portal" icono="upload_file">Subir documentación</Boton>
                <Boton tipo="button" variante="secundario" forma="grupo" tamano="portal" icono="chat">Escribir por WhatsApp</Boton>
                <Boton tipo="button" variante="contorno" forma="grupo" tamano="portal">Ver mis respuestas</Boton>
                <Boton tipo="button" variante="suave" forma="grupo" tamano="portal" icono="visibility">Ver</Boton>
            </Muestra>

            <Muestra nombre="Boton href · disabled" uso="Con href es un enlace de Inertia; con href y externo, un enlace común (una descarga). Deshabilitado baja la opacidad y no responde.">
                <Boton href={href('inicio')} variante="contorno" forma="grupo" icono="arrow_back">Enlace</Boton>
                <Boton href="#" externo variante="contorno" forma="grupo" icono="download">Descargar PDF</Boton>
                <Boton tipo="button" disabled>Deshabilitado</Boton>
            </Muestra>
        </div>
    );
}
