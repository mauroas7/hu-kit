import { useState } from 'react';
import { Boton, Input, Modal, ModalConfirmar, useConfirmacion } from '../../componentes/index.js';
import Muestra from '../Muestra.jsx';

// Sin servidor, la acción es una espera: `useConfirmacion` cierra el diálogo cuando termina.
const esperar = () => new Promise((listo) => setTimeout(listo, 800));

export default function Modales() {
    const [abierto, setAbierto] = useState(false);
    const { confirmar, props } = useConfirmacion();

    return (
        <div className="space-y-6">
            <Muestra nombre="Modal" uso="El diálogo para un formulario corto. Trae el foco atrapado, el cierre con Escape y el bloqueo del scroll.">
                <Boton tipo="button" variante="contorno" forma="grupo" icono="edit" onClick={() => setAbierto(true)}>
                    Abrir el modal
                </Boton>
            </Muestra>

            <Muestra nombre="ModalConfirmar · useConfirmacion" uso="La confirmación de una acción destructiva. Nunca window.confirm(). El hook lleva el estado: la acción en null ya es cerrado.">
                <Boton
                    tipo="button"
                    variante="contornoPeligro"
                    forma="grupo"
                    icono="delete"
                    onClick={() => confirmar({ titulo: 'Cancelar el pedido', detalle: 'El área va a tener que cargarlo de nuevo.', textoAceptar: 'Cancelar pedido', accion: esperar })}
                >
                    Cancelar un pedido
                </Boton>
            </Muestra>

            <Modal abierto={abierto} onCerrar={() => setAbierto(false)} titulo="Cambiar la cantidad">
                <div className="space-y-5">
                    <Input nombre="cantidad-modal" etiqueta="Cantidad" valor="40" onChange={() => {}} />
                    <div className="flex justify-end gap-2">
                        <Boton tipo="button" variante="fantasma" onClick={() => setAbierto(false)}>
                            Cancelar
                        </Boton>
                        <Boton tipo="button" onClick={() => setAbierto(false)}>
                            Guardar
                        </Boton>
                    </div>
                </div>
            </Modal>

            <ModalConfirmar {...props} />
        </div>
    );
}
