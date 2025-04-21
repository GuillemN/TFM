<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Refugi extends Model
{
    protected $table = 'refugis'; 
    protected $primaryKey = 'id_refugi'; 
    public $timestamps = false; 

    protected $fillable = [
        'nom',
        'coordenades',
        'capacitat',
        'contacte',
        'imatge',
        'parroquies'
    ];
}

