<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'featured_product_id'
    ];

    public function featuredProduct()
    {
        return $this->belongsTo(Product::class, 'featured_product_id');
    }
} 