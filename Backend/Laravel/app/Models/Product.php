<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'image',
        'gender',
        'colors'
    ];

    protected $casts = [
        'colors' => 'array',
        'price' => 'decimal:2'
    ];
} 