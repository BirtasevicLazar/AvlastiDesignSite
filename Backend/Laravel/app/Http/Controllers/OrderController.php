<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Mail\OrderConfirmationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['items.product'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'orders' => $orders
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'phone' => 'required|string',
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'country' => 'required|string',
            'city' => 'required|string',
            'street' => 'required|string',
            'houseNumber' => 'required|string',
            'floor' => 'nullable|string',
            'apartment' => 'nullable|string',
            'postalCode' => 'required|string',
            'note' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:products,id',
            'items.*.size' => 'required|string',
            'items.*.color' => 'nullable|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            // Kreiranje porudžbine
            $order = Order::create([
                'email' => $request->email,
                'phone' => $request->phone,
                'first_name' => $request->firstName,
                'last_name' => $request->lastName,
                'country' => $request->country,
                'city' => $request->city,
                'street' => $request->street,
                'house_number' => $request->houseNumber,
                'floor' => $request->floor,
                'apartment' => $request->apartment,
                'postal_code' => $request->postalCode,
                'note' => $request->note,
                'total_amount' => $request->total,
                'status' => 'pending'
            ]);

            // Dodavanje proizvoda u porudžbinu
            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'size' => $item['size'],
                    'color' => $item['color'] ?? null,
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);
            }

            DB::commit();

            // Nakon uspešnog kreiranja narudžbine
            Mail::to($request->email)->send(new OrderConfirmationMail($order));

            return response()->json([
                'message' => 'Porudžbina je uspešno kreirana',
                'order_id' => $order->id
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating order: ' . $e->getMessage());
            return response()->json([
                'message' => 'Došlo je do greške prilikom kreiranja porudžbine',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,completed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $order = Order::findOrFail($id);
            $order->update(['status' => $request->status]);

            return response()->json([
                'message' => 'Status porudžbine je uspešno ažuriran',
                'order' => $order
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Došlo je do greške prilikom ažuriranja statusa',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
