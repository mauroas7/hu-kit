import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Boton from './Boton.jsx';

/**
 * El diálogo genérico para formularios cortos: reprogramar, editar un hisopado,
 * agregar un material.
 *
 * Sobre `@headlessui/react`, como `ModalConfirmar`: portal, foco atrapado,
 * bloqueo de scroll y cierre con Escape o click afuera vienen resueltos.
 */
export default function Modal({ abierto, onCerrar, titulo, rotulo = null, pie = null, ancho = 'max-w-lg', children }) {
    return (
        <Dialog open={abierto} onClose={onCerrar} className="relative z-modal">
            {/* Al salir el panel sólo se desvanece: el contenido tiene que seguir dibujado hasta que se va. */}
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-primary/60 transition ease-out data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 dark:bg-black/80"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className={`flex max-h-[90vh] w-full ${ancho} flex-col overflow-hidden rounded-2xl border border-brandText-soft/70 bg-white text-brandText shadow-xl transition ease-out data-[closed]:opacity-0 data-[enter]:data-[closed]:scale-95 data-[enter]:duration-200 data-[leave]:duration-150 dark:border-gray-800 dark:bg-surface-dark dark:text-brandText-dark`}
                >
                    <CabeceraModal rotulo={rotulo} titulo={titulo} onCerrar={onCerrar} />

                    <div className="overflow-y-auto px-6 py-5">{children}</div>

                    {pie && (
                        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-brandText-soft/70 px-6 py-4 dark:border-gray-800 sm:flex-row sm:justify-end">
                            {pie}
                        </div>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    );
}

/** La cabecera de `Modal` y de `ModalConfirmar`: el rótulo, el título en hasta dos renglones y la X. */
export function CabeceraModal({ rotulo = null, claseRotulo = null, titulo, onCerrar }) {
    return (
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-brandText-soft/70 px-6 py-4 dark:border-gray-800">
            <div className="min-w-0">
                {rotulo && (
                    <p className={`mb-0.5 text-xs font-semibold uppercase tracking-widest ${claseRotulo ?? 'text-brandText-muted dark:text-brandText-mutedDark'}`}>
                        {rotulo}
                    </p>
                )}
                <DialogTitle className="text-base font-black uppercase leading-tight tracking-tight text-primary dark:text-gray-100 sm:text-lg">
                    {titulo}
                </DialogTitle>
            </div>

            <Boton tipo="button" variante="fantasma" forma="grupo" tamano="icono" icono="close" aria-label="Cerrar" onClick={onCerrar} />
        </div>
    );
}
