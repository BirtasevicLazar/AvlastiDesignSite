<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Order;

class OrderConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function build()
    {
        return $this->from('lazar.birtasevic1@gmail.com', 'Avlasti Design')
                    ->subject('Potvrda narudžbine - Avlasti Design')
                    ->view('emails.order_confirmation')
                    ->with([
                        'orderData' => $this->order
                    ]);
    }
} 