import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Icono from './Icono.jsx';

/**
 * El diálogo genérico para formularios cortos: reprogramar, editar un hisopado,
 * agregar un material.
 *
 * Sobre `@headlessui/react`, como `ModalConfirmar`: portal, foco atrapado,
 * bloqueo de scroll y cierre con Escape o click afuera vienen resueltos.
 */
export default function Modal({ abierto, onCerrar, titulo, ancho = 'max-w-lg', children }) {
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
                    className={`w-full ${ancho} overflow-hidden rounded-2xl border border-brandText-soft/70 bg-white text-brandText shadow-xl transition ease-out data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-0 dark:border-gray-800 dark:bg-surface-dark dark:text-brandText-dark`}
                >
                    <div className="flex items-center justify-between border-b border-brandText-soft/70 px-6 py-4 dark:border-gray-800">
                        <DialogTitle className="text-base font-semibold text-primary dark:text-gray-100">
                            {titulo}
                        </DialogTitle>
                        <button
                            type="button"
                            onClick={onCerrar}
                            aria-label="Cerrar"
                            className="text-brandText-muted dark:text-brandText-mutedDark transition-colors hover:text-primary dark:hover:text-gray-100"
                        >
                            <Icono nombre="close" className="text-xl" />
                        </button>
                    </div>

                    <div className="max-h-[75vh] overflow-y-auto px-6 py-5">{children}</div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
