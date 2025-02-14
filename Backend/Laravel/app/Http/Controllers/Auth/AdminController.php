<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AdminController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'password' => 'required|string|min:8',
        ]);

        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'admin' => $admin,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (! $admin || ! Hash::check($request->password, $admin->password)) {
            throw ValidationException::withMessages([
                'email' => ['Pogrešni kredencijali.'],
            ]);
        }

        // Prvo obrišemo sve postojeće tokene za ovog admina
        $admin->tokens()->delete();
        
        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'admin' => $admin,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        // Brišemo sve tokene za trenutnog korisnika
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Uspešno ste se odjavili']);
    }

    public function me(Request $request)
    {
        return response()->json([
            'admin' => $request->user()
        ]);
    }
} 