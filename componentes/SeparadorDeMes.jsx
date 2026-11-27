import Rotulo from './Rotulo.jsx';

/** El renglón que abre cada mes en un listado agrupado; `como="li"` si va en una lista. */
export default function SeparadorDeMes({ como: Elemento = 'div', children }) {
    return (
        <Elemento className="flex items-center gap-2 border-b border-gray-100 bg-canvas/60 px-5 py-2 dark:border-gray-800 dark:bg-canvas-dark/40">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-secondary" />
            <Rotulo>{children}</Rotulo>
        </Elemento>
    );
}
