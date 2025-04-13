<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Refugi;

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
}
