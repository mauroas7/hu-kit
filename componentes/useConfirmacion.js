import { useCallback, useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * El estado del diálogo de confirmación. Un solo estado, no dos: la acción en
 * `null` ya significa cerrado.
 *
 *   confirmar({ titulo, rotulo, detalle, textoAceptar, textoCancelar,
 *       textoProcesando, accion: (r) => r.patch(route(…)) });
 *
 * `accion` tiene que iniciar una visita de Inertia (con el `router` que
 * recibe) o devolver una promesa: el diálogo se cierra cuando termina la
 * visita o la promesa. Con una acción que no hace ninguna de las dos queda
 * cargando.
 */
export default function useConfirmacion() {
    const [pedido, setPedido] = useState(null);
    const [procesando, setProcesando] = useState(false);
    const ultimoPedido = useRef(null);

    // Cerrado, el diálogo se desvanece con los textos del último pedido, no vacío.
    useEffect(() => {
        if (pedido) ultimoPedido.current = pedido;
    }, [pedido]);

    const textos = pedido ?? ultimoPedido.current;

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
            titulo: textos?.titulo,
            rotulo: textos?.rotulo,
            detalle: textos?.detalle,
            textoAceptar: textos?.textoAceptar,
            textoCancelar: textos?.textoCancelar,
            textoProcesando: textos?.textoProcesando,
            procesando,
            onConfirmar: aceptar,
            onCerrar: cerrar,
        },
    };
}
