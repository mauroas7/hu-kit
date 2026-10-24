import { AvisoFlotante, Tarjeta } from '../../componentes/index.js';

export default function Avisos() {
    return (
        <div className="space-y-6">
            <Tarjeta titulo={<code className="font-semibold">Flash</code>}>
                <p className="max-w-3xl text-sm text-brandText dark:text-brandText-dark">
                    Los cuatro avisos de arriba son <code className="font-semibold">Flash</code>: lo que el controlador dejó con{' '}
                    <code className="font-semibold">-&gt;with(&apos;exito&apos;, …)</code>, compartido en{' '}
                    <code className="font-semibold">flash</code> desde <code className="font-semibold">HandleInertiaRequests</code>.{' '}
                    <code className="font-semibold">MarcoApp</code> ya lo trae: ninguna página lo monta.
                </p>
            </Tarjeta>

            <Tarjeta titulo={<code className="font-semibold">AvisoFlotante</code>}>
                <p className="max-w-3xl text-sm text-brandText dark:text-brandText-dark">
                    El aviso de abajo a la derecha: el mismo <code className="font-semibold">flash</code>, flotando, para las
                    pantallas donde uno arriba de todo no se vería. El éxito se va solo a los 5 segundos; un error queda hasta
                    que se cierra.
                </p>
            </Tarjeta>

            <AvisoFlotante />
        </div>
    );
}
