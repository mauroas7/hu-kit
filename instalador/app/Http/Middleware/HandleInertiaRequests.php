<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $usuario = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $usuario,
                // Lo que lee hu-kit: el marco, el menú de la cuenta y el modo oscuro.
                'usuario' => $usuario ? ['id' => $usuario->id, 'nombre' => $usuario->name, 'email' => $usuario->email] : null,
            ],
            // Lo que lee el toast de hu-kit.
            'flash' => [
                'exito' => fn () => $request->session()->get('exito'),
                'error' => fn () => $request->session()->get('error'),
                'aviso' => fn () => $request->session()->get('aviso'),
                'info' => fn () => $request->session()->get('info'),
            ],
        ];
    }
}
