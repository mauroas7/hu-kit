import { useEffect, useState } from 'react';
import { BarraDeProgreso, SelectorDeArchivo, Tarjeta } from '../../componentes/index.js';
import Muestra from '../Muestra.jsx';

export default function Archivos() {
    const [elegido, setElegido] = useState(null);
    const [progreso, setProgreso] = useState(35);

    // Una subida de mentira, para ver la barra moverse.
    useEffect(() => {
        const temporizador = setInterval(() => setProgreso((actual) => (actual >= 100 ? 0 : actual + 5)), 400);

        return () => clearInterval(temporizador);
    }, []);

    return (
        <div className="space-y-6">
            <Muestra nombre="SelectorDeArchivo" uso="El botón para elegir un archivo. En el celular ofrece sacar una foto o elegir un archivo; en la computadora abre el explorador.">
                <SelectorDeArchivo texto="Subir el remito" accept=".pdf,image/*" onElegir={(archivo) => setElegido(archivo.name)} />
                <SelectorDeArchivo texto="Subir" nombre="la orden médica" variante="suave" tamano="portal" accept=".pdf,image/*" onElegir={(archivo) => setElegido(archivo.name)} />
                {elegido && <p className="basis-full text-sm">Elegiste: {elegido}</p>}
            </Muestra>

            <Muestra nombre="BarraDeProgreso" uso="Cuánto lleva algo que tarda, como una subida." columna>
                <div className="max-w-xs space-y-1">
                    <BarraDeProgreso valor={progreso} etiqueta="Subiendo el remito" />
                    <p className="text-sm">Subiendo… {progreso}%</p>
                </div>
            </Muestra>

            <Tarjeta titulo={<code className="font-semibold">useSubidaDeArchivo</code>}>
                <p className="max-w-3xl text-sm text-brandText dark:text-brandText-dark">
                    El hook que sube de a un archivo con Inertia y da su progreso y su error:{' '}
                    <code className="font-semibold">{'const { subir, subiendo, progreso, errorDe } = useSubidaDeArchivo()'}</code>, y{' '}
                    <code className="font-semibold">{"subir('remito', route('pedidos.remito', pedido), { archivo })"}</code>. Acá no se
                    ve porque el catálogo no tiene servidor adonde subir.
                </p>
            </Tarjeta>
        </div>
    );
}
