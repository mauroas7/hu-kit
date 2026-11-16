import { Head } from '@inertiajs/react';
import { EstadoVacio, Tarjeta } from 'hu-kit/componentes';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard() {
    return (
        <AppLayout titulo="Tablero" subtitulo="Resumen del sistema">
            <Head title="Tablero" />

            <Tarjeta titulo="Primera pantalla" icono="rocket_launch">
                <EstadoVacio enTarjeta icono="dashboard_customize" titulo="Este tablero está vacío">
                    Armá acá la primera pantalla del sistema: este archivo es resources/js/Pages/Dashboard.jsx.
                </EstadoVacio>
            </Tarjeta>
        </AppLayout>
    );
}
