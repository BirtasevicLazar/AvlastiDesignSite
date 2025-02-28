<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['images' => function($query) {
            $query->orderBy('display_order');
        }])->get()->map(function($product) {
            $product->image = optional($product->primaryImage)->image_path;
            return $product;
        });

        return response()->json([
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'images' => 'required|array|min:1',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'gender' => 'required|in:male,female,unisex',
                'colors' => 'required|array',
                'colors.*' => 'string'
            ]);

            DB::beginTransaction();

            // Kreiraj proizvod
            $product = Product::create([
                'name' => $request->name,
                'price' => $request->price,
                'gender' => $request->gender,
                'colors' => array_values(array_filter($request->colors)) // Ukloni prazne vrednosti
            ]);

            // Dodaj slike
            foreach ($request->file('images') as $index => $image) {
                try {
                    $imagePath = $image->store('products', 'public');
                    
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $imagePath,
                        'is_primary' => $index === 0,
                        'display_order' => $index
                    ]);
                } catch (\Exception $e) {
                    Log::error('Error storing image: ' . $e->getMessage());
                    throw $e;
                }
            }

            DB::commit();

            // Učitaj proizvod sa slikama
            $product->load('images');
            $product->image = optional($product->primaryImage)->image_path;

            return response()->json([
                'message' => 'Product created successfully',
                'product' => $product
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating product: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Error creating product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Product $product)
    {
        $product->load('images');
        $product->image = optional($product->primaryImage)->image_path;
        
        return response()->json([
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'string|max:255',
            'price' => 'numeric|min:0',
            'new_images' => 'array',
            'new_images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'remove_images' => 'array',
            'remove_images.*' => 'exists:product_images,id',
            'gender' => 'in:male,female,unisex',
            'colors' => 'array'
        ]);

        try {
            DB::beginTransaction();

            $product->update($request->except(['new_images', 'remove_images']));

            // Brisanje označenih slika
            if ($request->has('remove_images')) {
                $imagesToRemove = ProductImage::whereIn('id', $request->remove_images)
                    ->where('product_id', $product->id)
                    ->get();

                foreach ($imagesToRemove as $image) {
                    Storage::disk('public')->delete($image->image_path);
                    $image->delete();
                }
            }

            // Dodavanje novih slika
            if ($request->hasFile('new_images')) {
                $lastOrder = $product->images()->max('display_order') ?? -1;
                
                foreach ($request->file('new_images') as $index => $image) {
                    $imagePath = $image->store('products', 'public');
                    
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $imagePath,
                        'is_primary' => !$product->primaryImage()->exists() && $index === 0,
                        'display_order' => $lastOrder + $index + 1
                    ]);
                }
            }

            DB::commit();

            $product->load('images');
            $product->image = optional($product->primaryImage)->image_path;

            return response()->json([
                'message' => 'Product updated successfully',
                'product' => $product
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error updating product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Product $product)
    {
        try {
            DB::beginTransaction();

            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->image_path);
            }
            
            $product->images()->delete();
            $product->delete();

            DB::commit();

            return response()->json([
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error deleting product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateImageOrder(Request $request, Product $product)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*.id' => 'required|exists:product_images,id',
            'images.*.display_order' => 'required|integer|min:0',
            'images.*.is_primary' => 'required|boolean'
        ]);

        try {
            DB::beginTransaction();

            foreach ($request->images as $imageData) {
                $product->images()
                    ->where('id', $imageData['id'])
                    ->update([
                        'display_order' => $imageData['display_order'],
                        'is_primary' => $imageData['is_primary']
                    ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Image order updated successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error updating image order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function setPrimaryImage(Request $request, Product $product)
    {
        $request->validate([
            'image_id' => 'required|exists:product_images,id'
        ]);

        try {
            DB::beginTransaction();

            // Resetuj sve slike na not primary
            $product->images()->update(['is_primary' => false]);

            // Postavi izabranu sliku kao primarnu
            $product->images()
                ->where('id', $request->image_id)
                ->update(['is_primary' => true]);

            DB::commit();

            return response()->json([
                'message' => 'Primary image set successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error setting primary image',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 