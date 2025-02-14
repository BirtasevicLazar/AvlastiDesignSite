<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSettings extends Model
{
    protected $fillable = [
        'bestseller_image',
        'bestseller_title',
        'bestseller_price',
    ];

    protected $casts = [
        'bestseller_price' => 'decimal:2',
    ];
} 