import { useState } from 'react';
import { Boton, Icono } from '../../componentes/index.js';
import { href } from '../datos.js';
import Muestra from '../Muestra.jsx';

export const VARIANTES = ['primario', 'secundario', 'exito', 'peligro', 'contorno', 'contornoPeligro', 'contornoExito', 'suave', 'fantasma', 'fantasmaPeligro', 'fantasmaExito'];

export default function Botones() {
    return (
        <div className="space-y-6">
            <Muestra
                nombre="Sistema de botones"
                uso="El peso lo da la intención, no el lugar: una sola acción llena por pantalla o modal, todo en tipo oración y de 44 px (tamano='tactil')."
                columna
            >
                <Nivel nombre="Principal · primario" uso="La acción que cierra la tarea.">
                    <Boton tipo="button" tamano="tactil">
                        Continuar
                        <Icono nombre="arrow_forward" className="text-lg leading-5" />
                    </Boton>
                    <Boton tipo="button" tamano="tactil" icono="check">Confirmar turno</Boton>
                </Nivel>
                <Nivel nombre="Marca · secundario" uso="Sólo «Nuevo turno» y la acción principal sobre primary.">
                    <Boton tipo="button" variante="secundario" forma="grupo" tamano="tactil" icono="calendar_add_on">Nuevo turno</Boton>
                    <span className="inline-flex flex-wrap items-center gap-3 rounded-2xl bg-primary p-3">
                        <Boton tipo="button" variante="secundario" forma="grupo" tamano="tactil" icono="list_alt">Indicaciones</Boton>
                        <Boton tipo="button" variante="contornoSobrePrimario" forma="grupo" tamano="tactil" icono="map">Cómo llegar</Boton>
                    </span>
                </Nivel>
                <Nivel nombre="De fila · suave" uso="Lo que se repite en cada fila o tarjeta.">
                    <Boton tipo="button" variante="suave" forma="grupo" tamano="tactil" icono="list_alt">Indicaciones</Boton>
                    <Boton tipo="button" variante="suave" forma="grupo" tamano="tactil" icono="download">Descargar PDF</Boton>
                </Nivel>
                <Nivel nombre="Secundaria · contorno" uso="Navega o sale, una vez por pantalla; la salida de un modal destructivo.">
                    <Boton tipo="button" variante="contorno" forma="grupo" tamano="tactil" icono="calendar_month">Ver mis turnos</Boton>
                    <Boton tipo="button" variante="contorno" tamano="tactil">Mantener turno</Boton>
                </Nivel>
                <Nivel nombre="Terciaria · fantasma" uso="Salir sin hacer nada. tamano='icono' mide 44 × 44 y lleva aria-label.">
                    <Boton tipo="button" variante="fantasma" tamano="tactil" icono="arrow_back">Volver</Boton>
                    <Boton tipo="button" variante="fantasma" forma="grupo" tamano="icono" icono="arrow_back" aria-label="Volver a especialidades" />
                    <Boton tipo="button" variante="fantasma" forma="grupo" tamano="icono" icono="close" aria-label="Cerrar" />
                </Nivel>
                <Nivel nombre="Destructiva en dos pasos" uso="fantasmaPeligro abre la confirmación; peligro va sólo en el modal que confirma.">
                    <Boton tipo="button" variante="fantasmaPeligro" forma="grupo" tamano="tactil" icono="event_busy">Cancelar</Boton>
                    <Icono nombre="arrow_forward" className="text-lg text-brandText-muted dark:text-brandText-mutedDark" />
                    <Boton tipo="button" variante="contorno" tamano="tactil">Mantener turno</Boton>
                    <Boton tipo="button" variante="peligro" tamano="tactil" icono="event_busy">Sí, cancelar turno</Boton>
                </Nivel>
            </Muestra>

            <EstadosDelBoton />

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
                nombre="Boton tamano='portal' (obsoleto)"
                uso="Táctil en mayúscula, el botón anterior del portal. Se reemplaza por tamano='tactil' y sale en v2.0.0. Un enlace que no puede ser un Boton lleva las mismas clases con claseBoton({ variante, forma, tamano })."
            >
                <Boton tipo="button" forma="grupo" tamano="portal" icono="upload_file">Subir documentación</Boton>
            </Muestra>

            <Muestra
                nombre="Boton variante='contornoSobrePrimario'"
                uso="La acción secundaria dentro de un bloque azul, como el turno del portal: no le gana a lo que el bloque destaca."
            >
                <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-primary p-5">
                    <Boton tipo="button" variante="secundario" forma="grupo" tamano="tactil">Principal</Boton>
                    <Boton tipo="button" variante="contornoSobrePrimario" forma="grupo" tamano="tactil" icono="chat">Escribinos</Boton>
                </div>
            </Muestra>

            <Muestra nombre="Boton href · disabled" uso="Con href es un enlace de Inertia; con href y externo, un enlace común (una descarga). Deshabilitado baja la opacidad y no responde.">
                <Boton href={href('inicio')} variante="contorno" forma="grupo" icono="arrow_back">Enlace</Boton>
                <Boton href="#" externo variante="contorno" forma="grupo" icono="download">Descargar PDF</Boton>
                <Boton tipo="button" disabled>Deshabilitado</Boton>
            </Muestra>
        </div>
    );
}

function Nivel({ nombre, uso, children }) {
    return (
        <div>
            <p className="text-sm font-semibold text-primary dark:text-gray-100">{nombre}</p>
            <p className="mb-2 text-xs text-brandText-muted dark:text-brandText-mutedDark">{uso}</p>
            <div className="flex flex-wrap items-center gap-3">{children}</div>
        </div>
    );
}

function EstadosDelBoton() {
    const [cargando, setCargando] = useState(false);

    function descargar() {
        setCargando(true);
        setTimeout(() => setCargando(false), 2500);
    }

    return (
        <Muestra
            nombre="Boton cargando · textoCargando"
            uso="Cargando no se atenúa: gira progress_activity, el texto pasa a gerundio, lleva aria-busy y no responde. El ancho queda fijo. Deshabilitado sí baja la opacidad; el motivo va al lado, con aria-live."
        >
            <Boton tipo="button" variante="suave" forma="grupo" tamano="tactil" icono="download" cargando={cargando} textoCargando="Descargando…" onClick={descargar}>
                Descargar PDF
            </Boton>
            <Boton tipo="button" tamano="tactil" cargando textoCargando="Confirmando…">Confirmar turno</Boton>
            <span className="inline-flex items-center gap-3">
                <span aria-live="polite" className="text-xs text-brandText-muted dark:text-brandText-mutedDark">Elegí un horario para continuar</span>
                <Boton tipo="button" tamano="tactil" disabled>Continuar</Boton>
            </span>
        </Muestra>
    );
}
