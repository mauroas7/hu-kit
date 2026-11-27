import { useState } from 'react';
import { Boton, Input, Modal, ModalConfirmar, Rotulo, useConfirmacion } from '../../componentes/index.js';
import Muestra from '../Muestra.jsx';

// Sin servidor, la acción es una espera: `useConfirmacion` cierra el diálogo cuando termina.
const esperar = () => new Promise((listo) => setTimeout(listo, 2000));

const TURNO = [
    ['Cuándo', 'Jueves 3 de diciembre · 09:30 h'],
    ['Especialidad', 'Cardiología'],
    ['Profesional', 'Laura Méndez'],
];

export default function Modales() {
    const [abierto, setAbierto] = useState(false);
    const { confirmar, props } = useConfirmacion();

    return (
        <div className="space-y-6">
            <Muestra nombre="Modal" uso="El diálogo para un formulario corto. Trae el foco atrapado, el cierre con Escape y el bloqueo del scroll; rotulo va sobre el título y pie, abajo, fijo.">
                <Boton tipo="button" variante="contorno" forma="grupo" tamano="tactil" icono="edit" onClick={() => setAbierto(true)}>
                    Abrir el modal
                </Boton>
            </Muestra>

            <Muestra nombre="ModalConfirmar · useConfirmacion" uso="La confirmación de una acción destructiva. Nunca window.confirm(). El hook lleva el estado: la acción en null ya es cerrado.">
                <Boton
                    tipo="button"
                    variante="fantasmaPeligro"
                    forma="grupo"
                    tamano="tactil"
                    icono="event_busy"
                    onClick={() =>
                        confirmar({
                            rotulo: 'No se puede deshacer',
                            titulo: 'Cancelar turno',
                            detalle: 'Vas a liberar este turno para otro paciente.',
                            textoCancelar: 'Mantener turno',
                            textoAceptar: 'Sí, cancelar turno',
                            textoProcesando: 'Cancelando…',
                            accion: esperar,
                        })
                    }
                >
                    Cancelar
                </Boton>
            </Muestra>

            <Modal
                abierto={abierto}
                onCerrar={() => setAbierto(false)}
                rotulo="Pedido 1024"
                titulo="Cambiar la cantidad"
                pie={
                    <>
                        <Boton tipo="button" variante="contorno" tamano="tactil" onClick={() => setAbierto(false)}>
                            Cancelar
                        </Boton>
                        <Boton tipo="button" tamano="tactil" onClick={() => setAbierto(false)}>
                            Guardar
                        </Boton>
                    </>
                }
            >
                <Input nombre="cantidad-modal" etiqueta="Cantidad" valor="40" onChange={() => {}} />
            </Modal>

            <ModalConfirmar {...props}>
                <dl className="space-y-3 rounded-xl bg-canvas p-4 dark:bg-canvas-dark">
                    {TURNO.map(([dato, valor]) => (
                        <div key={dato}>
                            <Rotulo como="dt">{dato}</Rotulo>
                            <dd className="mt-0.5 text-base font-semibold text-primary dark:text-gray-100">{valor}</dd>
                        </div>
                    ))}
                </dl>
            </ModalConfirmar>
        </div>
    );
}
