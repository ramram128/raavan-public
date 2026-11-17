<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudioProfile;
use App\Models\Service;
use App\Models\PricingPackage;
use App\Models\GalleryItem;
use App\Models\Testimonial;
use App\Models\TermsCondition;
use App\Models\Enquiry;

class ApiController extends Controller
{
    /**
     * Get complete studio brand information, branches, contact, and stats.
     */
    public function getStudio()
    {
        $studio = StudioProfile::first();
        if (!$studio) {
            return response()->json(['error' => 'Studio profile not configured'], 404);
        }
        return response()->json($studio);
    }

    /**
     * Get all services offered.
     */
    public function getServices()
    {
        $services = Service::where('is_active', true)->orderBy('order')->get();
        return response()->json($services);
    }

    /**
     * Get pricing packages grouped by category.
     */
    public function getPackages()
    {
        $packages = PricingPackage::orderBy('order')->get();
        return response()->json([
            'all' => $packages,
            'kutty_chutties' => $packages->where('category', 'newborn_toddler')->values(),
            'add_ons' => $packages->where('category', 'add_on')->values(),
            'weddings' => $packages->where('category', 'wedding')->values(),
        ]);
    }

    /**
     * Get curated gallery works.
     */
    public function getGallery(Request $request)
    {
        $query = GalleryItem::orderBy('order');
        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }
        return response()->json($query->get());
    }

    /**
     * Get client testimonials.
     */
    public function getTestimonials()
    {
        $testimonials = Testimonial::orderBy('order')->get();
        return response()->json($testimonials);
    }

    /**
     * Get Terms & Conditions (General & Toddlers).
     */
    public function getTerms()
    {
        $terms = TermsCondition::orderBy('order')->get();
        return response()->json([
            'all' => $terms,
            'general' => $terms->where('section_type', 'general')->values(),
            'toddlers' => $terms->where('section_type', 'toddlers')->values(),
        ]);
    }

    /**
     * Submit a new booking / enquiry.
     */
    public function storeEnquiry(Request $request)
    {
        $validated = $request->validate([
            'type' => 'nullable|string',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'event_type' => 'nullable|string',
            'event_date' => 'nullable|string',
            'location' => 'nullable|string',
            'parent_name' => 'nullable|string',
            'baby_name' => 'nullable|string',
            'baby_age' => 'nullable|string',
            'baby_weight' => 'nullable|string',
            'baby_gender' => 'nullable|string',
            'preferred_slot' => 'nullable|string',
            'selected_package' => 'nullable|string',
            'message' => 'nullable|string',
        ]);

        $enquiry = Enquiry::create($validated);

        // Build prefilled WhatsApp message as requested in client spec
        $waText = "Hi Raavan Studio’z! I have an upcoming event/project in mind and need your team to handle it.\n\n";
        $waText .= "• Name: " . $enquiry->name . "\n";
        $waText .= "• Phone: " . $enquiry->phone . "\n";
        if ($enquiry->email) $waText .= "• Email: " . $enquiry->email . "\n";

        if ($enquiry->type === 'newborn_toddler') {
            $waText .= "• Session: Newborn / Toddler Shoot\n";
            if ($enquiry->parent_name) $waText .= "• Parent's Name: " . $enquiry->parent_name . "\n";
            if ($enquiry->baby_name) $waText .= "• Baby Name: " . $enquiry->baby_name . "\n";
            if ($enquiry->baby_age) $waText .= "• Age: " . $enquiry->baby_age . "\n";
            if ($enquiry->baby_weight) $waText .= "• Weight: " . $enquiry->baby_weight . "\n";
            if ($enquiry->baby_gender) $waText .= "• Gender: " . $enquiry->baby_gender . "\n";
            if ($enquiry->selected_package) $waText .= "• Package: " . $enquiry->selected_package . "\n";
            if ($enquiry->preferred_slot) $waText .= "• Preferred Slot: " . $enquiry->preferred_slot . "\n";
        } else {
            if ($enquiry->event_type) $waText .= "• Event: " . $enquiry->event_type . "\n";
            if ($enquiry->event_date) $waText .= "• Date: " . $enquiry->event_date . "\n";
            if ($enquiry->location) $waText .= "• Place of Event: " . $enquiry->location . "\n";
        }

        if ($enquiry->message) $waText .= "\nNotes: " . $enquiry->message;

        $whatsappUrl = "https://wa.me/919500306696?text=" . urlencode($waText);

        return response()->json([
            'success' => true,
            'message' => 'Your enquiry has been received! We will contact you shortly.',
            'enquiry_id' => $enquiry->id,
            'whatsapp_url' => $whatsappUrl,
            'notification_sent_to' => 'raavanstudioz24@gmail.com',
        ], 201);
    }

    /**
     * Admin: list all enquiries.
     */
    public function getEnquiries()
    {
        $enquiries = Enquiry::latest()->get();
        return response()->json($enquiries);
    }

    /**
     * Admin: update enquiry status.
     */
    public function updateEnquiryStatus(Request $request, $id)
    {
        $enquiry = Enquiry::findOrFail($id);
        $enquiry->update([
            'status' => $request->input('status', 'contacted'),
        ]);

        return response()->json([
            'success' => true,
            'enquiry' => $enquiry,
        ]);
    }

    /**
     * Admin: delete an enquiry.
     */
    public function deleteEnquiry($id)
    {
        $enquiry = Enquiry::findOrFail($id);
        $enquiry->delete();

        return response()->json([
            'success' => true,
            'message' => 'Enquiry deleted successfully',
        ]);
    }

    /**
     * Get dynamic page CMS content (e.g. 'home', 'about', etc.).
     */
    public function getPageContent($page = null)
    {
        if ($page) {
            $record = \App\Models\PageContent::where('page', $page)->first();
            return response()->json($record ? $record->sections : null);
        }

        $all = \App\Models\PageContent::all()->pluck('sections', 'page');
        return response()->json($all);
    }
}
