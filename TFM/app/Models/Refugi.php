<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Refugi extends Model
{
    protected $table = 'refugis'; // opcional si segueixes la convenció
    protected $primaryKey = 'id_refugi'; // molt important si no es diu "id"
    public $timestamps = false; // o false si no tens created_at/updated_at

    protected $fillable = [
        'nom',
        'coordenades',
        'capacitat',
        'contacte',
        'imatge',
        'parroquies'
    ];
}

