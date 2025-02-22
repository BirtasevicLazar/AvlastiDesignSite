<!DOCTYPE html>
<html>
<head>
    <title>Potvrda narudžbine - Avlasti Design</title>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #000;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 0 0 5px 5px;
        }
        .order-details {
            background-color: #fff;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            color: #666;
            font-size: 14px;
        }
        .total {
            font-size: 18px;
            font-weight: bold;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px solid #eee;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Hvala na vašoj narudžbini!</h1>
    </div>
    
    <div class="content">
        <p>Poštovani/a {{ $orderData->first_name }} {{ $orderData->last_name }},</p>
        <p>Vaša narudžbina je uspešno kreirana i biće obrađena u najkraćem mogućem roku.</p>
        
        <div class="order-details">
            <h2>Detalji narudžbine:</h2>
            <p><strong>Broj narudžbine:</strong> #{{ $orderData->id }}</p>
            <p><strong>Email:</strong> {{ $orderData->email }}</p>
            <p><strong>Telefon:</strong> {{ $orderData->phone }}</p>
            <p><strong>Adresa za dostavu:</strong><br>
                {{ $orderData->street }} {{ $orderData->house_number }}<br>
                @if($orderData->floor)Sprat: {{ $orderData->floor }}<br>@endif
                @if($orderData->apartment)Stan: {{ $orderData->apartment }}<br>@endif
                {{ $orderData->postal_code }} {{ $orderData->city }}<br>
                {{ $orderData->country }}
            </p>
            
            <div class="total">
                <p>Ukupan iznos: {{ number_format($orderData->total_amount, 2) }} RSD</p>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <p>Ovo je automatski generisana poruka. Molimo vas da ne odgovarate na ovaj email.</p>
        <p>© {{ date('Y') }} Avlasti Design. Sva prava zadržana.</p>
    </div>
</body>
</html> 