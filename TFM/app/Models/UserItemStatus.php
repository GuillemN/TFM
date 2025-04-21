<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class UserItemStatus extends Model
{
    protected $table = 'user_item_status';

    protected $fillable = [
        'user_id',
        'item_id',
        'item_type',
        'status',
    ];

    public function item(): MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'item_type', 'item_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
