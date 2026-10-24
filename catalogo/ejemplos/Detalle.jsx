import { useEffect, useState } from 'react';
import {
    Alerta,
    BarraDeProgreso,
    Boton,
    Dato,
    Estado,
    EstadoVacio,
    ItemDeMenu,
    MenuDeAcciones,
    ModalConfirmar,
    Rotulo,
    SelectorDeArchivo,
    Solapas,
    Tarjeta,
    cuerpoTabla,
    encabezadoTabla,
    renglonTabla,
    useConfirmacion,
} from '../../componentes/index.js';
import { href } from '../datos.js';

const HISTORIAL = [
    ['22/10 09:14', 'Ana Gómez', 'Cargó el pedido'],
    ['22/10 11:40', 'Patrimonio', 'Lo pasó a revisión'],
];

const esperar = () => new Promise((listo) => setTimeout(listo, 800));

function Resumen() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Tarjeta titulo="Datos del pedido" icono="description">
                <div className="grid grid-cols-2 gap-4">
                    <Dato etiqueta="Insumo" valor="Guantes de látex talle M" />
                    <Dato etiqueta="Cantidad" valor="40 unidades" detalle="Consumo habitual: 30 por semana" />
                    <Dato etiqueta="Área" valor="Quirófano" />
                    <Dato etiqueta="Para cuándo" valor="jueves 30 de octubre" />
                </div>
            </Tarjeta>
            <Tarjeta titulo="Entrega" icono="local_shipping">
                <div className="grid grid-cols-2 gap-4">
                    <Dato etiqueta="Proveedor" valor={null} siFalta="Sin asignar" />
                    <Dato etiqueta="Remito" valor={null} siFalta="Todavía no llegó" />
                </div>
            </Tarjeta>
        </div>
    );
}

function Historial() {
    return (
        <Tarjeta titulo="Historial" icono="history" relleno={false}>
            <table className="w-full text-sm">
                <thead>
                    <tr className={encabezadoTabla}>
                        <th className="px-5 py-2 font-semibold">Cuándo</th>
                        <th className="px-3 py-2 font-semibold">Quién</th>
                        <th className="px-5 py-2 font-semibold">Qué</th>
                    </tr>
                </thead>
                <tbody className={cuerpoTabla}>
                    {HISTORIAL.map(([cuando, quien, que]) => (
                        <tr key={cuando} className={renglonTabla}>
                            <td className="px-5 py-3">{cuando}</td>
                            <td className="px-3 py-3 font-semibold text-primary dark:text-gray-100">{quien}</td>
                            <td className="px-5 py-3">{que}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Tarjeta>
    );
}

function Archivos() {
    const [progreso, setProgreso] = useState(60);

    useEffect(() => {
        const temporizador = setInterval(() => setProgreso((actual) => (actual >= 100 ? 0 : actual + 5)), 400);

        return () => clearInterval(temporizador);
    }, []);

    return (
        <Tarjeta titulo="Archivos" icono="folder">
            <Rotulo como="h3" linea className="mb-4">
                Remito
            </Rotulo>
            <div className="flex flex-wrap items-center gap-4">
                <SelectorDeArchivo texto="Subir el remito" accept=".pdf,image/*" onElegir={() => {}} />
                <div className="min-w-48 flex-1 space-y-1">
                    <BarraDeProgreso valor={progreso} etiqueta="Subiendo el remito" />
                    <p className="text-sm">Subiendo… {progreso}%</p>
                </div>
            </div>
            <div className="mt-6">
                <EstadoVacio icono="draft" enTarjeta>
                    Todavía no hay otros archivos.
                </EstadoVacio>
            </div>
        </Tarjeta>
    );
}

const SOLAPAS = [
    { clave: 'resumen', etiqueta: 'Resumen', icono: 'summarize', vista: Resumen },
    { clave: 'historial', etiqueta: 'Historial', icono: 'history', vista: Historial },
    { clave: 'archivos', etiqueta: 'Archivos', icono: 'folder', vista: Archivos },
];

export default function Detalle() {
    const parametros = new URLSearchParams(window.location.search);
    const [solapa, setSolapa] = useState(parametros.get('solapa') ?? 'resumen');
    const { confirmar, props } = useConfirmacion();

    const pedirCancelacion = () =>
        confirmar({
            titulo: 'Cancelar el pedido 1048',
            detalle: 'El área va a tener que cargarlo de nuevo si lo sigue necesitando.',
            textoAceptar: 'Cancelar pedido',
            accion: esperar,
        });

    // `?abrir=cancelar` abre la confirmación al entrar, para capturarla.
    useEffect(() => {
        if (parametros.get('abrir') === 'cancelar') pedirCancelacion();
    }, []);

    const Vista = (SOLAPAS.find((s) => s.clave === solapa) ?? SOLAPAS[0]).vista;

    return (
        <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <Boton href={href('listado')} variante="fantasma" forma="grupo" icono="arrow_back">
                    Volver
                </Boton>

                <div className="flex flex-wrap items-center gap-2">
                    <Estado tono="aviso" icono="schedule">
                        Pendiente
                    </Estado>
                    <Boton tipo="button" variante="contorno" forma="grupo" icono="check">
                        Aprobar
                    </Boton>
                    <MenuDeAcciones>
                        <ItemDeMenu icono="edit" href={href('formulario')}>
                            Editar
                        </ItemDeMenu>
                        <ItemDeMenu icono="content_copy" onClick={() => {}}>
                            Duplicar
                        </ItemDeMenu>
                        <ItemDeMenu icono="delete" onClick={pedirCancelacion} peligro separado>
                            Cancelar pedido
                        </ItemDeMenu>
                    </MenuDeAcciones>
                </div>
            </div>

            <Alerta tipo="aviso" titulo="Supera el consumo habitual" className="mb-6">
                El área pidió 40 unidades y suele usar 30 por semana. Patrimonio lo va a revisar antes de aprobarlo.
            </Alerta>

            <Solapas
                etiqueta="Partes del pedido"
                actual={solapa}
                opciones={SOLAPAS.map((s) => ({ clave: s.clave, etiqueta: s.etiqueta, icono: s.icono, onClick: () => setSolapa(s.clave) }))}
                className="mb-6"
            />

            <Vista />

            <ModalConfirmar {...props} />
        </div>
    );
}
