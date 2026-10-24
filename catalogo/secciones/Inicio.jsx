import { Alerta, Boton, Tarjeta } from '../../componentes/index.js';
import { href } from '../datos.js';
import { EJEMPLOS, PIEZAS } from '../Catalogo.jsx';

export default function Inicio() {
    return (
        <div className="space-y-6">
            <Tarjeta titulo="Qué es este catálogo" icono="info">
                <div className="max-w-3xl space-y-3 text-sm text-brandText dark:text-brandText-dark">
                    <p>
                        Es la vidriera de <strong className="font-semibold">hu-kit</strong>: muestra armadas todas las piezas que
                        los sistemas del Hospital Universitario instalan para verse y comportarse igual. Antes de hacer una
                        pantalla, mirá acá qué hay; si lo que necesitás ya existe, se importa de{' '}
                        <code className="font-semibold">hu-kit/componentes</code> y no se copia.
                    </p>
                    <p>
                        No tiene base de datos ni login: los datos son inventados. El botón de la luna, arriba a la derecha,
                        pasa todo a modo oscuro.
                    </p>
                </div>
            </Tarjeta>

            <Alerta tipo="info" titulo="Para abrirlo">
                En la carpeta de hu-kit: <code className="font-semibold">npm run catalogo</code>, y en el navegador la
                dirección que muestra la consola.
            </Alerta>

            <Tarjeta titulo="Las piezas" icono="widgets">
                <div className="flex flex-wrap gap-2">
                    {PIEZAS.slice(1).map((item) => (
                        <Boton key={item.clave} href={href(item.clave)} variante="contorno" forma="grupo" icono={item.icono}>
                            {item.etiqueta}
                        </Boton>
                    ))}
                </div>
            </Tarjeta>

            <Tarjeta titulo="Pantallas de ejemplo" icono="devices">
                <p className="mb-4 max-w-3xl text-sm text-brandText dark:text-brandText-dark">
                    Un sistema inventado, «Pedidos HU», armado sólo con piezas de hu-kit: así se ve un sistema del hospital
                    de punta a punta.
                </p>
                <div className="flex flex-wrap gap-2">
                    {EJEMPLOS.map((item) => (
                        <Boton key={item.clave} href={href(item.clave)} variante="contorno" forma="grupo" icono={item.icono}>
                            {item.etiqueta}
                        </Boton>
                    ))}
                    <Boton href={href('ingreso')} variante="contorno" forma="grupo" icono="login">
                        Ingreso
                    </Boton>
                </div>
            </Tarjeta>
        </div>
    );
}
