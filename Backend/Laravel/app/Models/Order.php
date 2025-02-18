<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'phone',
        'first_name',
        'last_name',
        'country',
        'city',
        'street',
        'house_number',
        'floor',
        'apartment',
        'postal_code',
        'note',
        'total_amount',
        'status'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
