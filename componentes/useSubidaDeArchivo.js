import { useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * Una subida por vez, con su progreso y el error de la fila que la pidió.
 * `subir` recibe la clave de la fila, la URL y los datos; el error es el
 * primero que devuelve la validación.
 */
export default function useSubidaDeArchivo() {
    const [subiendo, setSubiendo] = useState(null);
    const [progreso, setProgreso] = useState(0);
    const [errores, setErrores] = useState({});

    const subir = (clave, url, datos) =>
        router.post(url, datos, {
            forceFormData: true,
            preserveScroll: true,
            onStart: () => {
                setSubiendo(clave);
                setProgreso(0);
                setErrores(({ [clave]: _, ...resto }) => resto);
            },
            onProgress: (evento) => setProgreso(Math.round(evento?.percentage ?? 0)),
            onError: (respuesta) => setErrores((anteriores) => ({ ...anteriores, [clave]: Object.values(respuesta)[0] })),
            onFinish: () => setSubiendo(null),
        });

    return { subir, subiendo, progreso, errorDe: (clave) => errores[clave] ?? null };
}
