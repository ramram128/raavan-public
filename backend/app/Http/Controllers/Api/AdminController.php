<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\StudioProfile;
use App\Models\Service;
use App\Models\PricingPackage;
use App\Models\GalleryItem;
use App\Models\Testimonial;
use App\Models\TermsCondition;
use App\Models\Enquiry;

class AdminController extends Controller
{
    /**
     * Admin Login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials. Please check email and password.',
            ], 401);
        }

        $token = $user->createToken('admin-session')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    /**
     * Check current authentication
     */
    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user(),
        ]);
    }

    /**
     * Logout
     */
    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    /* ----------------------------------------------------
       1. Studio Profile Management
       ---------------------------------------------------- */
    public function updateStudio(Request $request)
    {
        $studio = StudioProfile::firstOrCreate(['id' => 1]);
        $data = $request->only([
            'name', 'tagline', 'founder_name', 'founder_experience', 'founder_bio',
            'founded_date', 'phone', 'whatsapp', 'email', 'instagram_main',
            'instagram_toddlers', 'instagram_photobooks', 'branches', 'stats', 'service_radius_note'
        ]);

        $studio->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Studio profile updated successfully',
            'studio' => $studio,
        ]);
    }

    /* ----------------------------------------------------
       2. Services Management
       ---------------------------------------------------- */
    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string',
            'tagline' => 'nullable|string',
            'description' => 'required|string',
            'starting_price' => 'nullable|string',
            'deliverables' => 'nullable|array',
            'features' => 'nullable|array',
            'image_url' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        $service = Service::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Service created successfully',
            'service' => $service,
        ], 201);
    }

    public function updateService(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        $data = $request->only([
            'title', 'category', 'tagline', 'description', 'starting_price',
            'deliverables', 'features', 'image_url', 'order', 'is_active'
        ]);

        $service->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Service updated successfully',
            'service' => $service,
        ]);
    }

    public function deleteService($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service deleted successfully',
        ]);
    }

    /* ----------------------------------------------------
       3. Pricing Packages Management
       ---------------------------------------------------- */
    public function storePackage(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'name' => 'required|string|max:255',
            'price_display' => 'required|string',
            'price_amount' => 'nullable|integer',
            'duration' => 'nullable|string',
            'badge' => 'nullable|string',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'is_featured' => 'nullable|boolean',
            'order' => 'nullable|integer',
        ]);

        $package = PricingPackage::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Package created successfully',
            'package' => $package,
        ], 201);
    }

    public function updatePackage(Request $request, $id)
    {
        $package = PricingPackage::findOrFail($id);
        $data = $request->only([
            'category', 'name', 'price_display', 'price_amount', 'duration',
            'badge', 'description', 'features', 'is_featured', 'order'
        ]);

        $package->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Package updated successfully',
            'package' => $package,
        ]);
    }

    public function deletePackage($id)
    {
        $package = PricingPackage::findOrFail($id);
        $package->delete();

        return response()->json([
            'success' => true,
            'message' => 'Package deleted successfully',
        ]);
    }

    /* ----------------------------------------------------
       4. Gallery / Curated Works Management
       ---------------------------------------------------- */
    public function storeGallery(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'couple_or_client' => 'nullable|string',
            'location' => 'nullable|string',
            'description' => 'nullable|string',
            'image_url' => 'required|string',
            'aspect' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $gallery = GalleryItem::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Gallery item added successfully',
            'gallery' => $gallery,
        ], 201);
    }

    public function updateGallery(Request $request, $id)
    {
        $gallery = GalleryItem::findOrFail($id);
        $data = $request->only([
            'title', 'category', 'couple_or_client', 'location', 'description',
            'image_url', 'aspect', 'order'
        ]);

        $gallery->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Gallery item updated successfully',
            'gallery' => $gallery,
        ]);
    }

    public function deleteGallery($id)
    {
        $gallery = GalleryItem::findOrFail($id);
        $gallery->delete();

        return response()->json([
            'success' => true,
            'message' => 'Gallery item deleted successfully',
        ]);
    }

    /* ----------------------------------------------------
       5. Terms & Conditions Management
       ---------------------------------------------------- */
    public function storeTerm(Request $request)
    {
        $validated = $request->validate([
            'section_type' => 'required|string',
            'section_number' => 'nullable|string',
            'title_en' => 'required|string',
            'title_ta' => 'nullable|string',
            'content_en' => 'required|string',
            'content_ta' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $term = TermsCondition::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Term added successfully',
            'term' => $term,
        ], 201);
    }

    public function updateTerm(Request $request, $id)
    {
        $term = TermsCondition::findOrFail($id);
        $data = $request->only([
            'section_type', 'section_number', 'title_en', 'title_ta',
            'content_en', 'content_ta', 'order'
        ]);

        $term->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Term updated successfully',
            'term' => $term,
        ]);
    }

    public function deleteTerm($id)
    {
        $term = TermsCondition::findOrFail($id);
        $term->delete();

        return response()->json([
            'success' => true,
            'message' => 'Term deleted successfully',
        ]);
    }

    /* ----------------------------------------------------
       6. Testimonials Management
       ---------------------------------------------------- */
    public function storeTestimonial(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|string',
            'category' => 'nullable|string',
            'location' => 'nullable|string',
            'quote' => 'required|string',
            'rating' => 'nullable|integer',
            'image_url' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $test = Testimonial::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Testimonial added successfully',
            'testimonial' => $test,
        ], 201);
    }

    public function deleteTestimonial($id)
    {
        $test = Testimonial::findOrFail($id);
        $test->delete();

        return response()->json([
            'success' => true,
            'message' => 'Testimonial deleted successfully',
        ]);
    }

    /* ----------------------------------------------------
       7. Image Upload Endpoint
       ---------------------------------------------------- */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
        ]);

        $file = $request->file('image');
        $filename = 'upload_' . time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();

        $destBackend = public_path('uploads');
        if (!File::isDirectory($destBackend)) {
            File::makeDirectory($destBackend, 0755, true, true);
        }
        $file->move($destBackend, $filename);

        // Also duplicate to frontend public/uploads so dev server serves it immediately
        $destFrontend = base_path('../frontend/public/uploads');
        if (!File::isDirectory($destFrontend)) {
            File::makeDirectory($destFrontend, 0755, true, true);
        }
        File::copy($destBackend . '/' . $filename, $destFrontend . '/' . $filename);

        $url = '/uploads/' . $filename;

        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'url' => $url,
            'filename' => $filename,
        ]);
    }
}

