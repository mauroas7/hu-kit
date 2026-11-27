import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Boton from './Boton.jsx';
import { CabeceraModal } from './Modal.jsx';

/**
 * El diálogo de confirmación de acciones destructivas.
 *
 * Sobre `@headlessui/react`, que ya trae portal, atrapado de foco, bloqueo del
 * scroll y cierre con Escape o click afuera.
 *
 * El estado lo lleva `useConfirmacion`: acá sólo se dibuja.
 */
export default function ModalConfirmar({
    abierto = false,
    titulo = '¿Confirmás la acción?',
    rotulo = null,
    detalle = null,
    textoAceptar = 'Confirmar',
    textoCancelar = 'Cancelar',
    textoProcesando = 'Confirmando…',
    procesando = false,
    onConfirmar,
    onCerrar,
    children = null,
}) {
    return (
        <Dialog open={abierto} onClose={onCerrar} className="relative z-modal">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-primary/60 transition ease-out data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 dark:bg-black/80"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-brandText-soft/70 bg-white text-brandText shadow-xl transition ease-out data-[closed]:opacity-0 data-[enter]:data-[closed]:scale-95 data-[enter]:duration-200 data-[leave]:duration-150 dark:border-gray-800 dark:bg-surface-dark dark:text-brandText-dark"
                >
                    <CabeceraModal rotulo={rotulo} claseRotulo="text-red-700 dark:text-red-300" titulo={titulo} onCerrar={onCerrar} />

                    {(detalle || children) && (
                        <div className="space-y-4 overflow-y-auto px-6 py-5">
                            {detalle && <p className="text-base leading-relaxed text-brandText dark:text-brandText-dark">{detalle}</p>}
                            {children}
                        </div>
                    )}

                    <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-brandText-soft/70 px-6 py-4 dark:border-gray-800 sm:grid sm:grid-cols-2">
                        <Boton tipo="button" variante="contorno" forma="confirmacion" tamano="tactil" className="w-full" onClick={onCerrar}>
                            {textoCancelar}
                        </Boton>

                        <Boton
                            tipo="button"
                            variante="peligro"
                            forma="confirmacion"
                            tamano="tactil"
                            className="w-full"
                            cargando={procesando}
                            textoCargando={textoProcesando}
                            onClick={onConfirmar}
                        >
                            {textoAceptar}
                        </Boton>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
