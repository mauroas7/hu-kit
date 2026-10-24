import { useState } from 'react';
import { Buscador, Campo, Checkbox, Input, PasswordInput, Select, SelectorFecha, Textarea, claseControl, descritoPor } from '../../componentes/index.js';
import Muestra from '../Muestra.jsx';

export default function Campos() {
    const [texto, setTexto] = useState('');
    const [busqueda, setBusqueda] = useState('guantes');
    const [area, setArea] = useState('');
    const [fecha, setFecha] = useState('2026-10-24');
    const [urgente, setUrgente] = useState(true);
    const [clave, setClave] = useState('');

    return (
        <div className="space-y-6">
            <Muestra nombre="Input" uso="El campo de texto. La etiqueta, la ayuda y el error los pone Campo, que lo envuelve." columna>
                <div className="grid gap-4 md:grid-cols-3">
                    <Input nombre="nombre" etiqueta="Nombre del insumo" valor={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Ej.: guantes de látex" requerido />
                    <Input nombre="codigo" etiqueta="Código" valor="" onChange={() => {}} ayuda="El que figura en la caja." />
                    <Input nombre="cantidad" etiqueta="Cantidad" valor="0" onChange={() => {}} error="La cantidad tiene que ser mayor que cero." />
                </div>
            </Muestra>

            <Muestra nombre="Select · Textarea · Checkbox" columna>
                <div className="grid gap-4 md:grid-cols-2">
                    <Select
                        nombre="area"
                        etiqueta="Área"
                        valor={area}
                        onChange={(e) => setArea(e.target.value)}
                        opciones={[
                            ['quirofano', 'Quirófano'],
                            ['guardia', 'Guardia'],
                            ['internacion', 'Internación'],
                        ]}
                    />
                    <Textarea nombre="motivo" etiqueta="Motivo" valor="" onChange={() => {}} ayuda="Para qué se necesita, en una o dos líneas." />
                </div>
                <Checkbox nombre="urgente" etiqueta="Es urgente" valor={urgente} onChange={(e) => setUrgente(e.target.checked)} ayuda="Patrimonio lo ve primero en su lista." />
            </Muestra>

            <Muestra nombre="SelectorFecha" uso="El único calendario del sistema: habla YYYY-MM-DD y no depende del idioma de la PC." columna>
                <div className="max-w-sm">
                    <SelectorFecha nombre="fecha" etiqueta="Fecha de entrega" valor={fecha} onChange={setFecha} desde="2026-10-01" limpiable />
                </div>
            </Muestra>

            <Muestra nombre="Buscador" uso="Con la lupa y la cruz para borrar. onChange recibe el texto." columna>
                <div className="max-w-sm">
                    <Buscador nombre="buscar" etiqueta="Buscar pedidos" valor={busqueda} onChange={setBusqueda} placeholder="Insumo o área…" />
                </div>
            </Muestra>

            <Muestra nombre="PasswordInput dentro de Campo" uso="La contraseña con el ojito. Va dentro de Campo, con claseControl y descritoPor." columna>
                <div className="max-w-sm">
                    <Campo id="clave" etiqueta="Contraseña" ayuda="Ocho caracteres como mínimo.">
                        <PasswordInput id="clave" value={clave} onChange={(e) => setClave(e.target.value)} aria-describedby={descritoPor('clave', null, 'Ocho caracteres como mínimo.')} className={claseControl(false)} />
                    </Campo>
                </div>
            </Muestra>
        </div>
    );
}
