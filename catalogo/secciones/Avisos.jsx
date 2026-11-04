import { Alerta, Tarjeta } from '../../componentes/index.js';

export default function Avisos() {
    return (
        <div className="space-y-6">
            <Tarjeta titulo={<code className="font-semibold">Flash · AvisoFlotante</code>}>
                <p className="max-w-3xl text-sm text-brandText dark:text-brandText-dark">
                    El toast de abajo a la derecha: lo que el controlador dejó con{' '}
                    <code className="font-semibold">-&gt;with(&apos;exito&apos;, …)</code>, compartido en{' '}
                    <code className="font-semibold">flash</code> desde <code className="font-semibold">HandleInertiaRequests</code>.
                    Cada mensaje es un texto o un <code className="font-semibold">{'{ titulo, detalle }'}</code>. El éxito y la
                    información se van solos a los 5 segundos (se frenan con el puntero o el foco encima); un error o un aviso
                    quedan hasta que se cierran. <code className="font-semibold">Flash</code> es el mismo toast con otro nombre:{' '}
                    <code className="font-semibold">MarcoApp</code> ya lo trae, ninguna página lo monta.
                </p>
            </Tarjeta>

            <Tarjeta titulo={<code className="font-semibold">Alerta</code>}>
                <div className="max-w-3xl space-y-3">
                    <p className="text-sm text-brandText dark:text-brandText-dark">
                        Para un <strong className="font-semibold">estado</strong>, algo que sigue siendo cierto y queda en
                        pantalla, va una <code className="font-semibold">Alerta</code> en el flujo. Para un{' '}
                        <strong className="font-semibold">evento</strong>, algo que acaba de pasar, va el toast.
                    </p>
                    <Alerta tipo="info" titulo="Tamaño equipo">El de las pantallas de gestión.</Alerta>
                    <Alerta tipo="info" tamano="portal" titulo="Tamaño portal">Texto base y más aire, el del portal de pacientes y el del cartel de estado que responde a lo que se acaba de hacer.</Alerta>
                </div>
            </Tarjeta>
        </div>
    );
}
