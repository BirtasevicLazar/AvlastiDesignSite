<?php

namespace App\Http\Controllers;

use App\Models\PopularProduct;
use App\Models\Product;
use Illuminate\Http\Request;

class PopularProductController extends Controller
{
    public function index()
    {
        $popularProducts = PopularProduct::with(['product.images' => function($query) {
            $query->orderBy('is_primary', 'desc')
                  ->orderBy('display_order');
        }])
        ->orderBy('display_order')
        ->get()
        ->map(function ($popularProduct) {
            $product = $popularProduct->product;
            $primaryImage = $product->images->first();
            
            return [
                'id' => $popularProduct->id,
                'product' => array_merge($product->toArray(), [
                    'images' => $product->images
                ]),
                'display_order' => $popularProduct->display_order
            ];
        });

        return response()->json(['popular_products' => $popularProducts]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'display_order' => 'required|integer|min:0'
        ]);

        // Proveri da li je proizvod već popularan
        $exists = PopularProduct::where('product_id', $request->product_id)->exists();
        if ($exists) {
            return response()->json(['message' => 'Proizvod je već dodat u popularne'], 422);
        }

        $popularProduct = PopularProduct::create($request->all());
        $popularProduct->load(['product.images' => function($query) {
            $query->orderBy('is_primary', 'desc')
                  ->orderBy('display_order');
        }]);

        return response()->json([
            'message' => 'Proizvod je uspešno dodat u popularne',
            'popular_product' => [
                'id' => $popularProduct->id,
                'product' => array_merge($popularProduct->product->toArray(), [
                    'images' => $popularProduct->product->images
                ]),
                'display_order' => $popularProduct->display_order
            ]
        ], 201);
    }

    public function destroy($id)
    {
        $popularProduct = PopularProduct::findOrFail($id);
        $popularProduct->delete();

        return response()->json(['message' => 'Proizvod je uklonjen iz popularnih']);
    }

    public function updateOrder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:popular_products,id',
            'orders.*.display_order' => 'required|integer|min:0'
        ]);

        foreach ($request->orders as $item) {
            PopularProduct::where('id', $item['id'])
                ->update(['display_order' => $item['display_order']]);
        }

        return response()->json(['message' => 'Redosled je uspešno ažuriran']);
    }

    public function getAvailableProducts()
    {
        $popularProductIds = PopularProduct::pluck('product_id');
        $availableProducts = Product::with(['images' => function($query) {
            $query->orderBy('is_primary', 'desc')
                  ->orderBy('display_order');
        }])
        ->whereNotIn('id', $popularProductIds)
        ->get();

        return response()->json(['available_products' => $availableProducts]);
    }
} 