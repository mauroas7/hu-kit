import { useState } from 'react';
import {
    Boton,
    Buscador,
    Estado,
    ItemDeMenu,
    MenuDeAcciones,
    Paginador,
    SelectorDeVista,
    Tarjeta,
    cuerpoTabla,
    encabezadoTabla,
    fechaCompleta,
    renglonTabla,
} from '../../componentes/index.js';
import { PAGINADOR, PEDIDOS, TONO_ESTADO, href } from '../datos.js';

export default function Listado() {
    const [busqueda, setBusqueda] = useState('');
    const [vista, setVista] = useState('todos');

    const visibles = PEDIDOS.filter(
        (pedido) =>
            (vista === 'todos' || pedido.estado === 'Pendiente') &&
            `${pedido.insumo} ${pedido.area}`.toLowerCase().includes(busqueda.toLowerCase()),
    );

    return (
        <Tarjeta
            titulo="Pedidos"
            icono="list_alt"
            contador={PAGINADOR.total}
            acciones={
                <Boton href={href('formulario')} forma="grupo" icono="add">
                    Nuevo pedido
                </Boton>
            }
        >
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div className="w-full max-w-sm">
                    <Buscador nombre="buscar-pedidos" valor={busqueda} onChange={setBusqueda} placeholder="Insumo o área…" />
                </div>
                <SelectorDeVista
                    etiqueta="Qué pedidos ver"
                    actual={vista}
                    opciones={[
                        { clave: 'todos', etiqueta: 'Todos', onClick: () => setVista('todos') },
                        { clave: 'pendientes', etiqueta: 'Pendientes', onClick: () => setVista('pendientes') },
                    ]}
                />
            </div>

            <div className="-mx-5 overflow-x-auto">
                <table className="w-full min-w-[48rem] text-sm">
                    <thead>
                        <tr className={encabezadoTabla}>
                            <th className="px-5 pb-2 font-semibold">Pedido</th>
                            <th className="px-3 pb-2 font-semibold">Área</th>
                            <th className="px-3 pb-2 font-semibold">Cantidad</th>
                            <th className="px-3 pb-2 font-semibold">Fecha</th>
                            <th className="px-3 pb-2 font-semibold">Estado</th>
                            <th className="w-px px-5 pb-2 font-semibold">
                                <span className="sr-only">Acciones</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className={cuerpoTabla}>
                        {visibles.map((pedido) => (
                            <tr key={pedido.id} className={renglonTabla}>
                                <td className="px-5 py-3">
                                    <p className="font-semibold text-primary dark:text-gray-100">{pedido.insumo}</p>
                                    <p className="text-xs text-brandText-muted dark:text-brandText-mutedDark">N.º {pedido.id}</p>
                                </td>
                                <td className="px-3 py-3">{pedido.area}</td>
                                <td className="px-3 py-3">{pedido.cantidad}</td>
                                <td className="px-3 py-3 first-letter:uppercase">{fechaCompleta(pedido.fecha)}</td>
                                <td className="px-3 py-3">
                                    <Estado tono={TONO_ESTADO[pedido.estado]}>{pedido.estado}</Estado>
                                </td>
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-2">
                                        <Boton href={href('detalle')} variante="fantasma" forma="grupo" tamano="compacto" icono="visibility">
                                            Ver
                                        </Boton>
                                        <MenuDeAcciones>
                                            <ItemDeMenu icono="edit" href={href('formulario')}>
                                                Editar
                                            </ItemDeMenu>
                                            <ItemDeMenu icono="delete" onClick={() => {}} peligro separado>
                                                Cancelar pedido
                                            </ItemDeMenu>
                                        </MenuDeAcciones>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <section className="mt-2">
                <Paginador paginador={PAGINADOR} />
            </section>
        </Tarjeta>
    );
}
