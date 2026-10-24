import { useState } from 'react';
import { Boton, Checkbox, Input, Select, SelectorFecha, Tarjeta, Textarea } from '../../componentes/index.js';
import { href } from '../datos.js';

export default function Formulario() {
    const [datos, setDatos] = useState({ insumo: 'Guantes de látex talle M', area: 'quirofano', cantidad: '', entrega: '2026-10-30', motivo: '', urgente: false });

    const cambiar = (campo) => (e) => setDatos((actuales) => ({ ...actuales, [campo]: e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e }));

    return (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <Tarjeta titulo="El pedido" icono="add_box">
                <div className="grid gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <Input nombre="insumo" etiqueta="Insumo" valor={datos.insumo} onChange={cambiar('insumo')} requerido />
                    </div>
                    <Select
                        nombre="area"
                        etiqueta="Área que lo pide"
                        valor={datos.area}
                        onChange={cambiar('area')}
                        requerido
                        opciones={[
                            ['quirofano', 'Quirófano'],
                            ['guardia', 'Guardia'],
                            ['internacion', 'Internación'],
                            ['consultorios', 'Consultorios'],
                        ]}
                    />
                    <Input nombre="cantidad" etiqueta="Cantidad" tipo="number" valor={datos.cantidad} onChange={cambiar('cantidad')} error="Indicá cuántas unidades necesitás." requerido />
                    <SelectorFecha nombre="entrega" etiqueta="Para cuándo" valor={datos.entrega} onChange={cambiar('entrega')} desde="2026-10-24" ayuda="Patrimonio entrega los martes y los viernes." />
                    <div className="md:pt-etiqueta">
                        <Checkbox nombre="urgente" etiqueta="Es urgente" valor={datos.urgente} onChange={cambiar('urgente')} />
                    </div>
                    <div className="md:col-span-2">
                        <Textarea nombre="motivo" etiqueta="Motivo" valor={datos.motivo} onChange={cambiar('motivo')} ayuda="Para qué se necesita, en una o dos líneas." />
                    </div>
                </div>
            </Tarjeta>

            <div className="flex justify-end gap-2">
                <Boton href={href('listado')} variante="fantasma">
                    Cancelar
                </Boton>
                <Boton icono="save">Guardar el pedido</Boton>
            </div>
        </form>
    );
}
