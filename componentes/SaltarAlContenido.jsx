/** Primer elemento enfocable de la pantalla: el teclado salta el menú y va al `<main id="contenido">`. */
export default function SaltarAlContenido() {
    return (
        <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-modal focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-lg focus:bg-primary focus:px-4 focus:text-sm focus:font-semibold focus:text-white focus:ring-2 focus:ring-white"
        >
            Saltar al contenido
        </a>
    );
}
