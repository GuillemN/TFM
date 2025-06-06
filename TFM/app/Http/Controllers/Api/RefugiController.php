<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Refugi;
use Illuminate\Support\Facades\DB;


class RefugiController extends Controller
{
    public function index()
    {
        return response()->json(Refugi::all());
    }
    public function getById($id)
{
    return Refugi::findOrFail($id);
}

public function show($id)
{
    $refugi = Refugi::select('id', 'nom', 'latitud', 'longitud', 'altitud')->findOrFail($id);
    return response()->json($refugi);
}
public function getRutesPerRefugi($id)
{
    $rutes = DB::table('punts_ruta')
        ->join('rutes', 'punts_ruta.ruta_id', '=', 'rutes.id')
        ->where('punts_ruta.tipus', 'Refugis')
        ->where('punts_ruta.tipus_id', $id)
        ->select('rutes.id', 'rutes.nom', 'rutes.imatge', 'rutes.dificultat', 'rutes.distancia_km', 'rutes.desnivell')
        ->distinct()
        ->get();

    return response()->json($rutes);
}
}
