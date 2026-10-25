import { useRef, useState } from 'react';
import Boton from './Boton.jsx';

const conDedo = () => typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;

/**
 * El botón para elegir un archivo. En el celular abre dos opciones, porque para
 * un papel lo más rápido es sacarle una foto; en computadora va directo al
 * explorador, donde la cámara no aporta nada. Las dos opciones ocupan el
 * renglón siguiente, así que el contenedor tiene que ser `flex flex-wrap`.
 * `nombre` es lo que se sube, para el lector de pantalla: «Subir» solo, en una
 * lista, no dice qué.
 */
export default function SelectorDeArchivo({ texto = 'Subir', nombre = null, accept, deshabilitado = false, variante = 'contorno', tamano = 'tactil', onElegir }) {
    const archivo = useRef(null);
    const camara = useRef(null);
    const [abierto, setAbierto] = useState(false);

    const alElegir = (e) => {
        const elegido = e.target.files?.[0];
        // Sin limpiar el input, volver a elegir el mismo archivo no dispara `change`.
        e.target.value = '';
        setAbierto(false);
        if (elegido) onElegir(elegido);
    };

    return (
        <>
            <input ref={archivo} type="file" className="hidden" accept={accept} onChange={alElegir} />
            <input ref={camara} type="file" className="hidden" accept="image/*" capture="environment" onChange={alElegir} />

            <Boton
                tipo="button"
                variante={variante}
                forma="grupo"
                tamano={tamano}
                icono="upload"
                disabled={deshabilitado}
                aria-expanded={conDedo() ? abierto : undefined}
                onClick={() => (conDedo() ? setAbierto(! abierto) : archivo.current?.click())}
            >
                {texto}
                {nombre && <span className="sr-only"> {nombre}</span>}
            </Boton>

            {abierto && (
                <div className="flex basis-full flex-wrap gap-2">
                    <Boton tipo="button" forma="grupo" tamano={tamano} icono="photo_camera" className="flex-1" onClick={() => camara.current?.click()}>
                        Sacar una foto
                    </Boton>
                    <Boton tipo="button" variante="contorno" forma="grupo" tamano={tamano} icono="folder_open" className="flex-1" onClick={() => archivo.current?.click()}>
                        Elegir un archivo
                    </Boton>
                </div>
            )}
        </>
    );
}
