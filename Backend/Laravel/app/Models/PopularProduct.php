<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PopularProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'display_order'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
} 