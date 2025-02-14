<?php

namespace App\Http\Controllers;

use App\Models\HeroSettings;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroSettingsController extends Controller
{
    public function index()
    {
        $settings = HeroSettings::with('featuredProduct')->first();
        
        return response()->json([
            'settings' => $settings,
            'featured_product' => $settings?->featuredProduct
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'featured_product_id' => 'required|exists:products,id'
        ]);

        $settings = HeroSettings::first();
        if (!$settings) {
            $settings = new HeroSettings();
        }

        $settings->featured_product_id = $request->featured_product_id;
        $settings->save();

        $settings->load('featuredProduct');

        return response()->json([
            'message' => 'Podešavanja su uspešno sačuvana',
            'settings' => $settings,
            'featured_product' => $settings->featuredProduct
        ]);
    }

    public function getAvailableProducts()
    {
        $products = Product::all();
        return response()->json(['available_products' => $products]);
    }
} 