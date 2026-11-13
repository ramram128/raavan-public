<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\AdminController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/studio', [ApiController::class, 'getStudio']);
Route::get('/services', [ApiController::class, 'getServices']);
Route::get('/packages', [ApiController::class, 'getPackages']);
Route::get('/gallery', [ApiController::class, 'getGallery']);
Route::get('/testimonials', [ApiController::class, 'getTestimonials']);
Route::get('/terms', [ApiController::class, 'getTerms']);
Route::post('/enquiries', [ApiController::class, 'storeEnquiry']);

/*
|--------------------------------------------------------------------------
| Admin Authentication
|--------------------------------------------------------------------------
*/

Route::post('/admin/login', [AdminController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Admin Endpoints
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {
    // Session / Auth
    Route::get('/me', [AdminController::class, 'me']);
    Route::post('/logout', [AdminController::class, 'logout']);

    // Studio Profile
    Route::put('/studio', [AdminController::class, 'updateStudio']);

    // Services CRUD
    Route::post('/services', [AdminController::class, 'storeService']);
    Route::put('/services/{id}', [AdminController::class, 'updateService']);
    Route::delete('/services/{id}', [AdminController::class, 'deleteService']);

    // Pricing Packages CRUD
    Route::post('/packages', [AdminController::class, 'storePackage']);
    Route::put('/packages/{id}', [AdminController::class, 'updatePackage']);
    Route::delete('/packages/{id}', [AdminController::class, 'deletePackage']);

    // Gallery / Curated Works CRUD
    Route::post('/gallery', [AdminController::class, 'storeGallery']);
    Route::put('/gallery/{id}', [AdminController::class, 'updateGallery']);
    Route::delete('/gallery/{id}', [AdminController::class, 'deleteGallery']);

    // Terms & Conditions CRUD
    Route::post('/terms', [AdminController::class, 'storeTerm']);
    Route::put('/terms/{id}', [AdminController::class, 'updateTerm']);
    Route::delete('/terms/{id}', [AdminController::class, 'deleteTerm']);

    // Testimonials CRUD
    Route::post('/testimonials', [AdminController::class, 'storeTestimonial']);
    Route::delete('/testimonials/{id}', [AdminController::class, 'deleteTestimonial']);

    // Media / Image Upload
    Route::post('/upload', [AdminController::class, 'uploadImage']);
});

// Enquiries Management (Used by Admin Panel)
Route::get('/enquiries', [ApiController::class, 'getEnquiries']);
Route::patch('/enquiries/{id}', [ApiController::class, 'updateEnquiryStatus']);
Route::delete('/enquiries/{id}', [ApiController::class, 'deleteEnquiry']);

Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'app' => 'Raavan Studio’z API',
        'framework' => 'Laravel 13.x',
        'timestamp' => now()->toIso8601String(),
    ]);
});
