import { useState } from 'react';
import { Buscador, Calendario, Campo, Checkbox, Estado, Input, PasswordInput, Select, SelectorFecha, Textarea, claseControl, descritoPor, fechaIso } from '../../componentes/index.js';
import Muestra from '../Muestra.jsx';

export default function Campos() {
    const [texto, setTexto] = useState('');
    const [busqueda, setBusqueda] = useState('guantes');
    const [area, setArea] = useState('');
    const [fecha, setFecha] = useState('2026-10-24');
    const [urgente, setUrgente] = useState(true);
    const [clave, setClave] = useState('');
    const [diaTurno, setDiaTurno] = useState(proximoConTurnos);
    const [diaAgenda, setDiaAgenda] = useState(() => fechaIso(new Date()));

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

            <Muestra nombre="Calendario" uso="El calendario siempre abierto, con la semana desde el lunes. Con disponible y sinPasado es el del turnero." columna>
                <div className="max-w-sm rounded-2xl border border-gray-100 p-3 dark:border-gray-800">
                    <Calendario valor={diaTurno} onElegir={setDiaTurno} disponible={hayTurnos} sinPasado etiqueta="Día del turno" />
                </div>
            </Muestra>

            <Muestra nombre="Calendario con contenidoDelDia" uso="La agenda: cada día muestra lo que devuelve contenidoDelDia; en el celular, un punto." columna>
                <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
                    <Calendario valor={diaAgenda} onElegir={setDiaAgenda} contenidoDelDia={cuposDelDia} etiqueta="Agenda del mes" />
                </div>
            </Muestra>

            <Muestra nombre="Buscador" uso="Con la lupa y la cruz para borrar. onChange recibe el texto; ancho es el del conjunto." columna>
                <Buscador nombre="buscar" etiqueta="Buscar pedidos" valor={busqueda} onChange={setBusqueda} placeholder="Insumo o área…" ancho="w-full lg:w-80" />
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

// Datos inventados para las muestras del calendario: turnos de lunes a viernes, salvo algunos días.
function hayTurnos(fecha) {
    return fecha.getDay() !== 0 && fecha.getDay() !== 6 && fecha.getDate() % 5 !== 0;
}

function proximoConTurnos() {
    const fecha = new Date();
    while (! hayTurnos(fecha)) fecha.setDate(fecha.getDate() + 1);

    return fechaIso(fecha);
}

// Un día completo no es un error para el médico: va neutro.
function cuposDelDia(fecha) {
    if (! hayTurnos(fecha)) return null;

    const libres = fecha.getDate() % 7;
    const [tono, punto] = libres === 0 ? ['neutro', 'bg-gray-500'] : libres <= 3 ? ['aviso', 'bg-secondary-dark'] : ['exito', 'bg-emerald-600'];

    return (
        <>
            <span className="hidden sm:inline-flex">
                <Estado tono={tono}>{libres === 0 ? 'Completo' : `${libres} ${libres === 1 ? 'libre' : 'libres'}`}</Estado>
            </span>
            <span className={`size-1.5 rounded-full sm:hidden ${punto}`} />
        </>
    );
}
