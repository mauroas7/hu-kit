import { Component } from 'react';
import Boton from './Boton.jsx';
import Icono from './Icono.jsx';

/**
 * Red de contención para toda la app: sin esto, cualquier throw en render
 * desmonta el árbol entero y deja al usuario con una pantalla en blanco.
 */
export default class ErrorBoundary extends Component {
    state = { crashed: false };

    static getDerivedStateFromError() {
        return { crashed: true };
    }

    componentDidCatch(error, info) {
        console.error('Error no controlado:', error, info);
    }

    render() {
        if (!this.state.crashed) return this.props.children;

        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas p-6 text-center dark:bg-canvas-dark">
                <Icono nombre="error" className="text-[56px] text-secondary" />
                <div>
                    <h1 className="text-xl font-black uppercase tracking-tight text-primary dark:text-gray-100">
                        Ocurrió un problema inesperado
                    </h1>
                    <p className="mt-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                        Recargá la página para volver a intentarlo.
                    </p>
                </div>
                <Boton tipo="button" onClick={() => window.location.reload()}>
                    Recargar página
                </Boton>
            </div>
        );
    }
}
