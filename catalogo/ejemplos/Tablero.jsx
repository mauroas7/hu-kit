import { useState } from 'react';
import { Cargando, Estado, Metrica, SelectorDeVista, Tarjeta, cuerpoTabla, encabezadoTabla, renglonTabla } from '../../componentes/index.js';
import { PEDIDOS, TONO_ESTADO } from '../datos.js';

const AREAS = [
    ['Quirófano', 18, 'exito'],
    ['Guardia', 12, 'exito'],
    ['Internación', 9, 'aviso'],
    ['Consultorios', 4, 'error'],
];

export default function Tablero() {
    const [periodo, setPeriodo] = useState('mes');

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Metrica valor={12} etiqueta="Pendientes de revisar" icono="pending_actions" tono="aviso" detalle="3 más que ayer" />
                <Metrica valor={31} etiqueta="Aprobados" icono="task_alt" detalle="Este mes" />
                <Metrica valor={48} etiqueta="Entregados" icono="local_shipping" tono="exito" detalle="Este mes" />
                <Metrica valor={2} etiqueta="Rechazados" icono="cancel" tono="error" detalle="Sin stock del proveedor" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Tarjeta
                    titulo="Pedidos por área"
                    icono="bar_chart"
                    acciones={
                        <SelectorDeVista
                            etiqueta="Período"
                            actual={periodo}
                            opciones={[
                                { clave: 'semana', etiqueta: 'Semana', onClick: () => setPeriodo('semana') },
                                { clave: 'mes', etiqueta: 'Mes', onClick: () => setPeriodo('mes') },
                            ]}
                        />
                    }
                >
                    <ul className="space-y-3">
                        {AREAS.map(([area, cantidad, tono]) => (
                            <li key={area} className="flex items-center justify-between gap-3 text-sm">
                                <span className="font-semibold text-primary dark:text-gray-100">{area}</span>
                                <Estado tono={tono}>{cantidad} pedidos</Estado>
                            </li>
                        ))}
                    </ul>
                </Tarjeta>

                <Tarjeta titulo="Últimos pedidos" icono="schedule" relleno={false}>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className={encabezadoTabla}>
                                <th className="px-5 py-2 font-semibold">Insumo</th>
                                <th className="px-5 py-2 font-semibold">Estado</th>
                            </tr>
                        </thead>
                        <tbody className={cuerpoTabla}>
                            {PEDIDOS.slice(0, 4).map((pedido) => (
                                <tr key={pedido.id} className={renglonTabla}>
                                    <td className="px-5 py-3 font-semibold text-primary dark:text-gray-100">{pedido.insumo}</td>
                                    <td className="px-5 py-3">
                                        <Estado tono={TONO_ESTADO[pedido.estado]}>{pedido.estado}</Estado>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Tarjeta>
            </div>

            <Tarjeta titulo="Consumo del año" icono="timeline">
                <Cargando enTarjeta>Cargando el consumo del año…</Cargando>
            </Tarjeta>
        </div>
    );
}
