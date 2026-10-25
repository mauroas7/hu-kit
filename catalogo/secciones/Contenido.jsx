import {
    Alerta,
    Boton,
    Cargando,
    Dato,
    Estado,
    EstadoVacio,
    Metrica,
    Paginador,
    Rotulo,
    Tarjeta,
    cuerpoTabla,
    encabezadoTabla,
    renglonTabla,
} from '../../componentes/index.js';
import { PAGINADOR, PEDIDOS, TONO_ESTADO } from '../datos.js';
import Muestra from '../Muestra.jsx';

export default function Contenido() {
    return (
        <div className="space-y-6">
            <Muestra nombre="Tarjeta" uso="El contenedor de todo contenido: título con ícono, un contador pegado y acciones a la derecha." columna>
                <Tarjeta titulo="Pedidos pendientes" icono="pending_actions" contador={3} acciones={<Boton tipo="button" variante="contorno" forma="grupo" tamano="compacto">Ver todos</Boton>}>
                    <p className="text-sm">El cuerpo de la tarjeta.</p>
                </Tarjeta>
            </Muestra>

            <Muestra nombre="Estado" uso="La píldora de estado, por tono. El color dice qué tan bien está, no qué es.">
                <Estado tono="exito" icono="check_circle">Entregado</Estado>
                <Estado tono="error" icono="cancel">Rechazado</Estado>
                <Estado tono="aviso" icono="schedule">Pendiente</Estado>
                <Estado tono="info">Aprobado</Estado>
                <Estado tono="neutro">Borrador</Estado>
            </Muestra>

            <Muestra nombre="Alerta" uso="El aviso en el flujo de la pantalla. error y aviso interrumpen al lector de pantalla; exito e info esperan su turno." columna>
                <Alerta tipo="exito">Se guardó el pedido.</Alerta>
                <Alerta tipo="error" titulo="No se pudo consultar el stock">Probá de nuevo en unos minutos.</Alerta>
                <Alerta tipo="aviso">El pedido supera el consumo habitual del área.</Alerta>
                <Alerta tipo="info">Los pedidos se aprueban de lunes a viernes.</Alerta>
            </Muestra>

            <div className="grid gap-6 lg:grid-cols-2">
                <Muestra nombre="EstadoVacio" uso="Cuando no hay nada: qué pasa y quién lo va a mover." columna>
                    <EstadoVacio icono="inventory_2" titulo="Sin pedidos para revisar">Cuando un área cargue uno, aparece acá.</EstadoVacio>
                    <EstadoVacio icono="task_alt" titulo="Todo entregado" listo>No queda nada pendiente esta semana.</EstadoVacio>
                </Muestra>

                <Muestra nombre="Cargando" uso="Mientras llega algo. Sola va en renglón; enTarjeta ocupa el lugar de una lista." columna>
                    <Cargando />
                    <Cargando enTarjeta>Cargando los pedidos…</Cargando>
                </Muestra>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Muestra nombre="Dato · Rotulo" uso="Dato es un valor de una ficha con su rótulo; Rotulo, el texto chico en mayúsculas que nombra lo que sigue. En el portal de pacientes va con tono='texto'." columna>
                    <Rotulo como="h3" linea>Datos del pedido</Rotulo>
                    <div className="grid grid-cols-2 gap-4">
                        <Dato etiqueta="Área" valor="Quirófano" />
                        <Dato etiqueta="Cantidad" valor="40 unidades" detalle="Consumo habitual: 30" />
                        <Dato etiqueta="Proveedor" valor={null} siFalta="Sin asignar" />
                        <Dato etiqueta="Entrega" valor="viernes 24 de octubre" />
                    </div>
                    <Rotulo tono="texto">Tono texto, para el portal</Rotulo>
                </Muestra>

                <Muestra nombre="Metrica" uso="El número grande de un tablero, con su etiqueta y su detalle al pie.">
                    <div className="grid w-full grid-cols-2 gap-4">
                        <Metrica valor={12} etiqueta="Pendientes" icono="pending_actions" tono="aviso" detalle="3 más que ayer" />
                        <Metrica valor={48} etiqueta="Entregados" icono="local_shipping" tono="exito" detalle="Este mes" />
                    </div>
                </Muestra>
            </div>

            <Muestra nombre="Tabla · Paginador" uso="La tabla se arma con encabezadoTabla, cuerpoTabla y renglonTabla. El Paginador recibe el paginador de Laravel tal como llega." columna>
                <div className="-mx-5 overflow-x-auto">
                    <table className="w-full min-w-[40rem] text-sm">
                        <thead>
                            <tr className={encabezadoTabla}>
                                <th className="px-5 pb-2 font-semibold">Pedido</th>
                                <th className="px-3 pb-2 font-semibold">Área</th>
                                <th className="px-3 pb-2 font-semibold">Cantidad</th>
                                <th className="px-5 pb-2 font-semibold">Estado</th>
                            </tr>
                        </thead>
                        <tbody className={cuerpoTabla}>
                            {PEDIDOS.slice(0, 3).map((pedido) => (
                                <tr key={pedido.id} className={renglonTabla}>
                                    <td className="px-5 py-3 font-semibold text-primary dark:text-gray-100">{pedido.insumo}</td>
                                    <td className="px-3 py-3">{pedido.area}</td>
                                    <td className="px-3 py-3">{pedido.cantidad}</td>
                                    <td className="px-5 py-3">
                                        <Estado tono={TONO_ESTADO[pedido.estado]}>{pedido.estado}</Estado>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <section>
                    <Paginador paginador={PAGINADOR} />
                </section>
            </Muestra>
        </div>
    );
}
