<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Estany;
use Illuminate\Http\Request;

class EstanyController extends Controller
{
    // GET /api/estanys
    public function index()
    {
        // Return all estanys as JSON
        return response()->json(Estany::all());
    }

    // GET /api/estanys/{id}
    public function getById($id)
    {
        // Find estany by ID or fail
        $estany = Estany::findOrFail($id);
        return response()->json($estany);
    }
}
