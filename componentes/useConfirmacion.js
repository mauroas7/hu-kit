import { useCallback, useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * El estado del diálogo de confirmación. Un solo estado, no dos: la acción en
 * `null` ya significa cerrado.
 *
 *   confirmar({ titulo, detalle, accion: (r) => r.patch(route(…)) });
 */
export default function useConfirmacion() {
    const [pedido, setPedido] = useState(null);
    const [procesando, setProcesando] = useState(false);

    const confirmar = useCallback((nuevoPedido) => setPedido(nuevoPedido), []);

    const cerrar = useCallback(() => {
        if (! procesando) setPedido(null);
    }, [procesando]);

    const aceptar = useCallback(() => {
        if (! pedido) return;

        setProcesando(true);

        const cerrarAlTerminar = () => {
            setProcesando(false);
            setPedido(null);
        };

        /*
         * Una visita de Inertia no devuelve promesa, así que el cierre se
         * engancha al evento `finish`. Sin esto el diálogo se cierra apenas
         * sale el pedido y `procesando` nunca llega a verse.
         */
        const desuscribir = router.on('finish', () => {
            desuscribir();
            cerrarAlTerminar();
        });

        const resultado = pedido.accion?.(router);

        if (resultado instanceof Promise) {
            desuscribir();
            resultado.finally(cerrarAlTerminar);
        }
    }, [pedido]);

    return {
        confirmar,
        props: {
            abierto: pedido !== null,
            titulo: pedido?.titulo,
            detalle: pedido?.detalle,
            textoAceptar: pedido?.textoAceptar,
            procesando,
            onConfirmar: aceptar,
            onCerrar: cerrar,
        },
    };
}
