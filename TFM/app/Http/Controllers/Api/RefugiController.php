<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Refugi;

class RefugiController extends Controller
{
    public function index()
    {
        return response()->json(Refugi::all());
    }
}
