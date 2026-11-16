<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Serve React SPA index.html for all frontend web routes, or return JSON 404 for missing API endpoints
Route::fallback(function (Request $request) {
    if ($request->is('api/*') || $request->wantsJson()) {
        return response()->json(['message' => 'API endpoint not found.'], 404);
    }

    $indexPath = public_path('index.html');
    if (file_exists($indexPath)) {
        return response()->file($indexPath);
    }

    return response()->json([
        'message' => 'Raavan Studio’z API is running.',
        'version' => '1.0.0',
    ]);
});

