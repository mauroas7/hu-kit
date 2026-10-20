import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Boton from './Boton.jsx';
import Icono from './Icono.jsx';

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
    detalle = null,
    textoAceptar = 'Confirmar',
    procesando = false,
    onConfirmar,
    onCerrar,
}) {
    return (
        <Dialog open={abierto} onClose={onCerrar} className="relative z-modal">
            {/* El panel entra con escala y sale en seco: el contenido de varios se vacía al cerrar. */}
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-primary-dark/50 transition duration-200 ease-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-md overflow-hidden rounded-2xl border border-brandText-soft/70 bg-white text-brandText shadow-xl transition ease-out data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-0 dark:border-gray-800 dark:bg-surface-dark dark:text-brandText-dark"
                >
                    <div className="flex items-start gap-4 px-6 pt-6">
                        <span
                            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                            aria-hidden="true"
                        >
                            <Icono nombre="warning" className="text-2xl" relleno />
                        </span>

                        <div className="min-w-0 space-y-1 pt-0.5">
                            <DialogTitle className="text-base font-semibold text-primary dark:text-gray-100">
                                {titulo}
                            </DialogTitle>
                            {detalle && <p className="text-sm text-brandText-muted dark:text-brandText-mutedDark">{detalle}</p>}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-2 bg-canvas/50 px-6 py-4 dark:bg-white/5">
                        <Boton tipo="button" variante="fantasma" onClick={onCerrar}>
                            Cancelar
                        </Boton>

                        <Boton
                            tipo="button"
                            variante="peligro"
                            disabled={procesando}
                            onClick={onConfirmar}
                        >
                            {procesando ? 'Confirmando…' : textoAceptar}
                        </Boton>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
