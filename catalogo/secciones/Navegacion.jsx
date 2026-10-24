import { useState } from 'react';
import { ItemDeMenu, MenuDeAcciones, SelectorDeVista, Solapas } from '../../componentes/index.js';
import Muestra from '../Muestra.jsx';

const SOLAPAS = [
    { clave: 'resumen', etiqueta: 'Resumen', icono: 'summarize' },
    { clave: 'historial', etiqueta: 'Historial', icono: 'history' },
    { clave: 'archivos', etiqueta: 'Archivos', icono: 'folder' },
];

const VISTAS = [
    { clave: 'mes', etiqueta: 'Mes' },
    { clave: 'semana', etiqueta: 'Semana' },
    { clave: 'dia', etiqueta: 'Día' },
];

export default function Navegacion() {
    const [solapa, setSolapa] = useState('resumen');
    const [vista, setVista] = useState('semana');

    return (
        <div className="space-y-6">
            <Muestra nombre="Solapas" uso="Las partes de una pantalla larga, como un expediente. Con href cada solapa es una visita que no suma al historial; con onClick cambia sólo lo que se ve." columna>
                <Solapas etiqueta="Partes del pedido" actual={solapa} opciones={SOLAPAS.map((s) => ({ ...s, onClick: () => setSolapa(s.clave) }))} />
                <p className="text-sm">Solapa elegida: {solapa}.</p>
            </Muestra>

            <Muestra nombre="SelectorDeVista" uso="Ver lo mismo de otra forma: mes, semana o día; activos o todos.">
                <SelectorDeVista etiqueta="Vista de la agenda" actual={vista} opciones={VISTAS.map((v) => ({ ...v, onClick: () => setVista(v.clave) }))} />
            </Muestra>

            <Muestra nombre="MenuDeAcciones · ItemDeMenu" uso="Las acciones que no entran como botón. El panel flota, así una tabla con scroll no lo recorta. peligro pinta de rojo; separado aparta con una raya.">
                <MenuDeAcciones>
                    <ItemDeMenu icono="edit" onClick={() => {}}>Editar</ItemDeMenu>
                    <ItemDeMenu icono="content_copy" onClick={() => {}}>Duplicar</ItemDeMenu>
                    <ItemDeMenu icono="delete" onClick={() => {}} peligro separado>
                        Cancelar pedido
                    </ItemDeMenu>
                </MenuDeAcciones>
            </Muestra>
        </div>
    );
}
