<?php

namespace App\Http\Controllers;

use App\Models\HeroSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroSettingsController extends Controller
{
    public function index()
    {
        $settings = HeroSettings::first();
        
        if ($settings && $settings->bestseller_image) {
            $settings->bestseller_image = asset('storage/' . $settings->bestseller_image);
        }
        
        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $request->validate([
            'bestseller_image' => 'nullable|image|max:2048', // max 2MB
            'bestseller_title' => 'required|string|max:255',
            'bestseller_price' => 'required|numeric|min:0',
        ]);

        $settings = HeroSettings::first() ?? new HeroSettings();

        if ($request->hasFile('bestseller_image')) {
            // Izbriši staru sliku ako postoji
            if ($settings->bestseller_image) {
                Storage::disk('public')->delete($settings->bestseller_image);
            }

            // Sačuvaj novu sliku
            $path = $request->file('bestseller_image')->store('hero', 'public');
            $settings->bestseller_image = $path;
        }

        $settings->bestseller_title = $request->bestseller_title;
        $settings->bestseller_price = $request->bestseller_price;
        $settings->save();

        return response()->json([
            'message' => 'Podešavanja su uspešno ažurirana',
            'settings' => $settings
        ]);
    }
} 