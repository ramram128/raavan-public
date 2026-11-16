<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\StudioProfile;
use App\Models\Service;
use App\Models\PricingPackage;
use App\Models\GalleryItem;
use App\Models\Testimonial;
use App\Models\TermsCondition;
use App\Models\Enquiry;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 0. Default Admin User
        User::firstOrCreate(
            ['email' => 'admin@raavanstudioz.com'],
            [
                'name' => 'Mr. Gowtham Raj',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // 1. Studio Profile
        StudioProfile::create([
            'name' => 'Raavan Studio’z',
            'tagline' => 'Make a count Click the moment',
            'founder_name' => 'Mr. Gowtham Raj',
            'founder_experience' => '8+ Years',
            'founder_bio' => 'With over 8 years of dedicated visual storytelling experience, Mr. Gowtham Raj founded Raavan Studio’z to transform unscripted, raw human moments into timeless cinematic heirlooms.',
            'founded_date' => '21st January 2021',
            'phone' => '+91-9500306696',
            'whatsapp' => '+919500306696',
            'email' => 'raavanstudioz24@gmail.com',
            'instagram_main' => '@raavan_studioz',
            'instagram_toddlers' => '@toddlers_by_raavan',
            'instagram_photobooks' => '@photobooks_by_raavan',
            'branches' => [
                [
                    'name' => 'The Creative Space',
                    'tag' => 'Flagship Experience Studio',
                    'address' => 'Raavan Studio’z, 3/470B RCC Moulding Building- Ground floor, Gandhi nagar, Salem-Bangalore Highways, Krishnagiri- 635001',
                    'landmark' => 'Opposite Gunam Hospital, Near Challenge Gym',
                    'map_url' => 'https://maps.app.goo.gl/13tnC9ZgRtQ5Ftje8',
                ],
                [
                    'name' => 'Work Space',
                    'tag' => 'Production & Editing Hub',
                    'address' => 'Raavan Studio’z, 3/59-9, Gandhi Nagar, Near Pillayar Kovil, Krishnagiri- 635001',
                    'landmark' => 'BATA Showroom down lane, backside central theatre',
                    'map_url' => 'https://maps.app.goo.gl/e11f4M4RwXUbF1gcA',
                ],
            ],
            'stats' => [
                ['value' => '250+', 'label' => 'Weddings Documented'],
                ['value' => '8+ Years', 'label' => 'Industry Experience'],
                ['value' => '100%', 'label' => 'Unscripted Emotion'],
                ['value' => '500+', 'label' => 'Happy Families'],
            ],
            'service_radius_note' => 'We provide services all over the country and internationally. For newborn "HOME SHOOTS", travel is completely free within a 20km radius of Krishnagiri.',
        ]);

        // 2. Services
        $services = [
            [
                'slug' => 'weddings',
                'title' => 'Weddings',
                'category' => 'Celebrations',
                'tagline' => 'Cinematic & Timeless Storytelling',
                'description' => 'Crafting cinematic and elegant wedding portraiture. We blend artistic direction with genuine storytelling to preserve every cherished detail of your celebrations, authentically brought to life by Raavan Studio’z.',
                'starting_price' => 'Custom Quote',
                'deliverables' => ['4K Cinematic Film', 'Candid Moments', 'Traditional Stills', 'Handcrafted Photobook'],
                'features' => ['Multi-camera team', 'Drone aerial coverage', 'Same-day highlight preview', 'Master colour grading'],
                'image_url' => '/kalyanam/page_4_img_1.png',
                'order' => 1,
            ],
            [
                'slug' => 'couple-portraits',
                'title' => 'Couple Portraits',
                'category' => 'Couples',
                'tagline' => 'Pre-wedding & Post-wedding Reverie',
                'description' => 'From the quiet excitement before the vows to the bliss of newlywed life, we craft intimate couple portraits that capture your genuine chemistry and the real faces of joy - timelessly captured by Raavan Studio’z.',
                'starting_price' => 'Custom Quote',
                'deliverables' => ['Curated High-Res Gallery', 'Moodboard Direction', 'Styling Consultation', 'Mini Teaser Reel'],
                'features' => ['Scenic outdoor destinations', 'Authentic candid chemistry', 'Golden hour sessions', 'Print-ready retouched portraits'],
                'image_url' => '/kalyanam/page_5_img_1.png',
                'order' => 2,
            ],
            [
                'slug' => 'maternity-portraits',
                'title' => 'Maternity Portraits',
                'category' => 'Motherhood',
                'tagline' => 'Preserving the Sacred Grace',
                'description' => 'Preserving the sacred grace of motherhood. We blend artistic elegance with heartfelt moments of your little one’s happiness and the radiant glow on your face, with the signature expertise of Raavan Studio’z.',
                'starting_price' => '₹4,500',
                'deliverables' => ['Studio & Outdoor Setups', 'Gown & Drape Concepts', '15+ Fine Art Retouched Photos', 'Digital Gallery'],
                'features' => ['Gentle comfortable pacing', 'Spouse & family inclusion', 'Custom maternity props', 'Fine-art lighting design'],
                'image_url' => 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=85',
                'order' => 3,
            ],
            [
                'slug' => 'newborn-photography',
                'title' => 'Newborn Photography',
                'category' => 'Babies',
                'tagline' => 'Soft Beginnings & Tender Innocence',
                'description' => 'The softest beginnings and sweetest little details. These little moments never come again. We capture the quiet serenity, tiny features, and pure innocence of your newborn’s first days, creating tender memories to treasure forever with Raavan Studio’z.',
                'starting_price' => '₹2,500',
                'deliverables' => ['Sanitized Studio Setups', 'Warm Wraps & Baskets', 'Digital Edited Photos', 'Free 20km Travel for Home Shoots'],
                'features' => ['3-member specialized newborn crew', 'Baby safety certified practices', 'Parent-baby bonding shots', 'Relaxed session with feeding breaks'],
                'image_url' => '/gallery/kutty_1.jpg',
                'order' => 4,
            ],
            [
                'slug' => 'toddlers-photography',
                'title' => 'Toddler’s Photography',
                'category' => 'Toddlers',
                'tagline' => 'Curiosity, Giggles & Boundless Energy',
                'description' => 'Full of curiosity, giggles, and boundless energy. We capture the unscripted joy, playful expressions, and vibrant personality of your little one’s early days, turning everyday milestones into priceless memories with Raavan Studio’z.',
                'starting_price' => '₹2,500',
                'deliverables' => ['Themed Backdrops & Outfits', 'Action & Candid Shots', 'Complimentary Wooden Frame', 'Digital Album'],
                'features' => ['Cake smash setup available', 'Custom themed costumes', 'High-speed candid capture', 'Sibling & family portraits'],
                'image_url' => '/gallery/kutty_4.jpg',
                'order' => 5,
            ],
            [
                'slug' => 'model-portraits',
                'title' => 'Model Portraits',
                'category' => 'Editorial',
                'tagline' => 'High-Fashion & Editorial Presence',
                'description' => 'Designed for aspiring and professional models. We craft striking, high-fashion portraiture that highlights your unique features, versatility, and presence - building a show-stopping editorial portfolio with Raavan Studio’z.',
                'starting_price' => '₹5,000',
                'deliverables' => ['Editorial Comp Card Assets', 'Studio Strobe & Natural Lighting', 'High-End Magazine Retouching', 'Commercial Usage License'],
                'features' => ['Pose coaching', 'Outfit change flexibility', 'Agency portfolio guidance', 'Headshots & full-length edits'],
                'image_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
                'order' => 6,
            ],
            [
                'slug' => 'photobooks',
                'title' => 'Photobooks',
                'category' => 'Heirloom',
                'tagline' => 'More than an Album — A Tangible Legacy',
                'description' => 'More than an album - A tangible legacy of your most sacred moments. Handcrafted with ultra-premium materials and exquisite print quality, our custom luxury photobooks preserve your raw emotions and intimate stories for generations.',
                'starting_price' => '₹8,500',
                'deliverables' => ['Ultra-Premium Layflat Binding', 'Archival Cotton & Silk Paper', 'Custom Leather/Linen Debossing', 'Protective Presentation Box'],
                'features' => ['Non-fading archival inks', 'Bespoke layout design', 'Client review iterations', 'Lifetime print longevity'],
                'image_url' => '/kalyanam/page_3_img_1.png',
                'order' => 7,
            ],
            [
                'slug' => 'automotive-edits',
                'title' => 'Automotive Edits & Vehicle Unveilings',
                'category' => 'Commercial',
                'tagline' => 'High-Octane Visual Drama',
                'description' => 'Vehicle launch teasers, tracking shots, and cinematic automotive storytelling for brand unveilings and private collections.',
                'starting_price' => 'Custom Quote',
                'deliverables' => ['Rolling Cinema Shots', 'Dramatic Strobe Stills', 'Social Reels Edit'],
                'features' => ['Gimbal tracking rig', 'Location scouting', 'Sound design & grading'],
                'image_url' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
                'order' => 8,
            ],
        ];

        foreach ($services as $s) {
            Service::create($s);
        }

        // 3. Pricing Packages (Kutty Chutties & Weddings)
        $packages = [
            [
                'category' => 'newborn_toddler',
                'name' => 'MINI MEMORIES',
                'price_display' => 'Rs. 2,500',
                'price_amount' => 2500,
                'duration' => '15–20-minute studio session',
                'badge' => 'Intro Session',
                'description' => 'Ideal for milestone portraits and classic newborn/toddler themes.',
                'features' => [
                    '15–20-minute studio session',
                    '1 backdrop / setup',
                    '1 outfit',
                    '5 professionally edited digital photos',
                ],
                'is_featured' => false,
                'order' => 1,
            ],
            [
                'category' => 'newborn_toddler',
                'name' => 'SWEET BEGINNINGS',
                'price_display' => 'Rs. 5,000',
                'price_amount' => 5000,
                'duration' => '30- minute session',
                'badge' => 'Classic',
                'description' => 'A wonderful balance of wraps, setups, and a special parent-baby moment.',
                'features' => [
                    '30- minute session',
                    '2 setups (wraps / simple props)',
                    '2 outfits / wraps',
                    '10 edited digital photos',
                    'Parent + baby shot included',
                ],
                'is_featured' => false,
                'order' => 2,
            ],
            [
                'category' => 'newborn_toddler',
                'name' => 'LITTLE STARS',
                'price_display' => 'Rs. 8,000',
                'price_amount' => 8000,
                'duration' => '60-minute session',
                'badge' => 'Most Popular',
                'description' => 'Our most requested experience covering multi-theme magic and family love.',
                'features' => [
                    '60-minute session',
                    '3 themed setups',
                    '3 outfits / props provided',
                    '15 edited digital photos',
                    'Family portrait included',
                    '1 complimentary frame',
                ],
                'is_featured' => true,
                'order' => 3,
            ],
            [
                'category' => 'newborn_toddler',
                'name' => 'TINY ROYALTY',
                'price_display' => 'Rs. 12,000',
                'price_amount' => 12000,
                'duration' => '90-minute relaxed session',
                'badge' => 'Luxury Newborn / Toddler Experience',
                'description' => 'Luxury newborn / toddler experience with lavish heirloom prints.',
                'features' => [
                    'Luxury newborn / toddler experience',
                    '90-minute relaxed session',
                    '5 premium setups',
                    'All props & outfits provided',
                    '25 edited digital photos',
                    'Parents + sibling portraits',
                    '5 high-end retouched images',
                    '3 frames',
                ],
                'is_featured' => false,
                'order' => 4,
            ],
            [
                'category' => 'add_on',
                'name' => 'Extra edited photo',
                'price_display' => 'Rs. 100 each',
                'price_amount' => 100,
                'duration' => 'Per image',
                'badge' => 'Optional Add-On',
                'description' => 'High-end skin retouching, color balance, and archival export.',
                'features' => [
                    'Extra edited photo – Rs. 100 each',
                    'Skin tone perfecting & colour balance',
                    'Full resolution uncompressed export',
                ],
                'is_featured' => false,
                'order' => 5,
            ],
            [
                'category' => 'add_on',
                'name' => 'Cake smash setup',
                'price_display' => 'Rs. 1,500',
                'price_amount' => 1500,
                'duration' => 'Extension',
                'badge' => 'Optional Add-On',
                'description' => 'Full playful cake smash setup with festive theme decorations.',
                'features' => [
                    'Cake smash setup – Rs. 1,500',
                    'Dedicated festive smash theme backdrop',
                    'Party props & post-smash bath included',
                ],
                'is_featured' => false,
                'order' => 6,
            ],
            [
                'category' => 'wedding',
                'name' => 'Namma Veetu Kalyanam',
                'price_display' => 'Get a Quote',
                'price_amount' => 0,
                'duration' => 'Full Day / Multi-Day',
                'badge' => 'Weddings & Celebrations',
                'description' => 'Tailored coverage combining candid artistry, cinematic filmmaking, and heirloom photobooks.',
                'features' => [
                    'Pre-wedding & Muhurtham coverage',
                    'Cinematic 4K teaser & highlight film',
                    'Traditional video & candid photography',
                    'Custom luxury handcrafted photobook',
                    'Drone aerial footage included',
                    'Nationwide & destination travel',
                ],
                'is_featured' => true,
                'order' => 7,
            ],
        ];

        foreach ($packages as $pkg) {
            PricingPackage::create($pkg);
        }

        // 4. Curated Works / Gallery Items (Populated with Real Drive Photos)
        $gallery = [
            [
                'title' => 'Namma Veetu Kalyanam Rituals',
                'category' => 'Weddings',
                'couple_or_client' => 'Arun & Divya',
                'location' => 'Krishnagiri Grand Mandapam',
                'description' => 'Sacred mantras, garland exchange, and heartfelt blessings captured in rich film tonality.',
                'image_url' => '/drive_gallery/optimized/weddings/kal_page_1.jpg',
                'aspect' => 'portrait',
                'order' => 1,
            ],
            [
                'title' => 'Sacred Garland Exchange',
                'category' => 'Weddings',
                'couple_or_client' => 'Senthil & Keerthana',
                'location' => 'Tamil Nadu',
                'description' => 'The divine muhurtham moments filled with family joy and vibrant floral beauty.',
                'image_url' => '/drive_gallery/optimized/weddings/kal_page_2.jpg',
                'aspect' => 'portrait',
                'order' => 2,
            ],
            [
                'title' => 'Bridal Grace & Adornments',
                'category' => 'Weddings',
                'couple_or_client' => 'Meenakshi',
                'location' => 'Raavan Studio’z Creative Space',
                'description' => 'Intricate bridal jewellery, radiant anticipation, and timeless traditional poise.',
                'image_url' => '/drive_gallery/optimized/weddings/kal_page_3.jpg',
                'aspect' => 'portrait',
                'order' => 3,
            ],
            [
                'title' => 'Muhurtham Reverence',
                'category' => 'Weddings',
                'couple_or_client' => 'Karthik & Deepa',
                'location' => 'Krishnagiri',
                'description' => 'Tying the sacred knot surrounded by loved ones and holy agni.',
                'image_url' => '/drive_gallery/optimized/weddings/kal_page_4.jpg',
                'aspect' => 'portrait',
                'order' => 4,
            ],
            [
                'title' => 'Golden Hour Couple Reverie',
                'category' => 'Couple portraits',
                'couple_or_client' => 'Sanjay & Priya',
                'location' => 'Krishnagiri Countryside',
                'description' => 'Intimate chemistry in golden twilight outdoors away from the wedding crowd.',
                'image_url' => '/drive_gallery/optimized/weddings/kal_page_5.jpg',
                'aspect' => 'portrait',
                'order' => 5,
            ],
            [
                'title' => 'Reception Celebration & Laughter',
                'category' => 'Weddings',
                'couple_or_client' => 'Vijay & Anitha',
                'location' => 'Grand Convention Centre',
                'description' => 'Unscripted moments of pure joy and celebration with friends and family.',
                'image_url' => '/drive_gallery/optimized/weddings/kal_page_6.jpg',
                'aspect' => 'portrait',
                'order' => 6,
            ],
            [
                'title' => 'Heartfelt Unscripted Smiles',
                'category' => 'Weddings',
                'couple_or_client' => 'Manoj & Kavitha',
                'location' => 'Salem - Bangalore Highway',
                'description' => 'Candid emotional connections that bring memories alive for generations.',
                'image_url' => '/drive_gallery/optimized/weddings/kal_page_7.jpg',
                'aspect' => 'portrait',
                'order' => 7,
            ],
            [
                'title' => 'Tender Newborn Serenity',
                'category' => 'Newborns',
                'couple_or_client' => 'Baby Rithvik',
                'location' => 'The Creative Space',
                'description' => 'A soft wool basket setup capturing the peaceful serenity of first days.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_01.jpg',
                'aspect' => 'portrait',
                'order' => 8,
            ],
            [
                'title' => 'Sweet Dreams in Knitted Wrap',
                'category' => 'Newborns',
                'couple_or_client' => 'Baby Aarav',
                'location' => 'Krishnagiri Flagship Studio',
                'description' => 'Gentle baby posing with hypoallergenic natural wraps and cozy blankets.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_03.jpg',
                'aspect' => 'wide',
                'order' => 9,
            ],
            [
                'title' => 'Curious Little Giggles',
                'category' => 'Toddlers',
                'couple_or_client' => 'Kutty Ananya',
                'location' => 'Studio Themed Setup',
                'description' => 'Playful exploration and infectious baby smiles during our milestone shoot.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_05.jpg',
                'aspect' => 'wide',
                'order' => 10,
            ],
            [
                'title' => 'Kutty Chutties Playtime',
                'category' => 'Toddlers',
                'couple_or_client' => 'Master Dev',
                'location' => 'Creative Space Studio',
                'description' => 'Unscripted expressions full of wonder, curiosity, and boundless energy.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_07.jpg',
                'aspect' => 'wide',
                'order' => 11,
            ],
            [
                'title' => 'Floral Nest Milestone',
                'category' => 'Newborns',
                'couple_or_client' => 'Baby Diya',
                'location' => 'Toddlers by Raavan',
                'description' => 'Whimsical floral nest arrangement with delicate pastel blooms.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_09.jpg',
                'aspect' => 'wide',
                'order' => 12,
            ],
            [
                'title' => 'Tiny Toes & Gentle Touches',
                'category' => 'Newborns',
                'couple_or_client' => 'Baby Mithun',
                'location' => 'Creative Space Studio',
                'description' => 'Macro details of tender little fingers and the softest innocence.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_12.jpg',
                'aspect' => 'wide',
                'order' => 13,
            ],
            [
                'title' => 'First Birthday Joy',
                'category' => 'Toddlers',
                'couple_or_client' => 'Master Sai',
                'location' => 'Studio Theme Setup',
                'description' => 'Celebrating 1st milestone with vibrant props, balloons, and big smiles.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_15.jpg',
                'aspect' => 'wide',
                'order' => 14,
            ],
            [
                'title' => 'Cozy Woolen Basket Snooze',
                'category' => 'Newborns',
                'couple_or_client' => 'Baby Tanya',
                'location' => 'Sanitized Studio Setup',
                'description' => 'Peaceful dreams in handcrafted rustic basket with temperature control.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_18.jpg',
                'aspect' => 'wide',
                'order' => 15,
            ],
            [
                'title' => 'Happy Little Star',
                'category' => 'Toddlers',
                'couple_or_client' => 'Master Varun',
                'location' => 'Krishnagiri',
                'description' => 'Sparkling eyes and radiant childhood joy captured by our specialized baby crew.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_21.jpg',
                'aspect' => 'wide',
                'order' => 16,
            ],
            [
                'title' => 'Classic Little Gentleman',
                'category' => 'Toddlers',
                'couple_or_client' => 'Master Kavin',
                'location' => 'The Creative Space',
                'description' => 'Adorable designer outfits handpicked for heirloom photo albums.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_28.jpg',
                'aspect' => 'wide',
                'order' => 17,
            ],
            [
                'title' => 'Tiny Royalty Portrait',
                'category' => 'Newborns',
                'couple_or_client' => 'Baby Nila',
                'location' => 'Toddlers by Raavan',
                'description' => 'Regal themed setups designed to create family keepsakes that last forever.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_38.jpg',
                'aspect' => 'wide',
                'order' => 18,
            ],
            [
                'title' => 'Pure Innocence & Smiles',
                'category' => 'Toddlers',
                'couple_or_client' => 'Baby Advik',
                'location' => 'Studio Setup',
                'description' => 'Sweet candid laugh that captures this precious phase before they grow up.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_55.jpg',
                'aspect' => 'wide',
                'order' => 19,
            ],
            [
                'title' => 'Gentle Milestone Heirloom',
                'category' => 'Newborns',
                'couple_or_client' => 'Baby Shravan',
                'location' => 'Creative Space Studio',
                'description' => 'A calming portrait reflecting warmth, gentleness, and artistic lighting.',
                'image_url' => '/drive_gallery/optimized/kutty/kutty_74.jpg',
                'aspect' => 'portrait',
                'order' => 20,
            ],
            [
                'title' => 'Handcrafted Luxury Photobook',
                'category' => 'Photobooks',
                'couple_or_client' => 'Legacy Collection',
                'location' => 'Raavan Studio’z Atelier',
                'description' => 'Handbound Italian linen with custom gold foil debossing and layflat non-fading archival pages.',
                'image_url' => '/kalyanam/page_3_img_1.png',
                'aspect' => 'wide',
                'order' => 21,
            ],
        ];

        foreach ($gallery as $g) {
            GalleryItem::create($g);
        }

        // 5. Testimonials
        $testimonials = [
            [
                'client_name' => 'Suresh & Preeti',
                'category' => 'Wedding',
                'location' => 'Krishnagiri',
                'quote' => 'Gowtham Raj and his team at Raavan Studio’z captured every single second of our wedding so naturally! There was zero artificial posing — just real smiles, real emotions, and breathtaking cinematic grading.',
                'rating' => 5,
                'image_url' => '/kalyanam/page_2_img_1.png',
                'order' => 1,
            ],
            [
                'client_name' => 'Dr. Vignesh & Meera',
                'category' => 'Toddlers by Raavan',
                'location' => 'Salem - Bangalore Road',
                'quote' => 'We booked the Tiny Royalty package for our 1-year-old daughter. The patience Gowtham and the 3-member team had with our baby was remarkable! The photo frames and album quality blew us away.',
                'rating' => 5,
                'image_url' => '/gallery/kutty_1.jpg',
                'order' => 2,
            ],
            [
                'client_name' => 'Kavitha & Ramesh',
                'category' => 'Maternity & Newborn',
                'location' => 'Hosur / Krishnagiri',
                'quote' => 'They came to our home for the newborn shoot and made us feel so safe and comfortable. The themes, sanitized props, and final edited photos are priceless heirlooms for our family.',
                'rating' => 5,
                'image_url' => 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=400&q=80',
                'order' => 3,
            ],
        ];

        foreach ($testimonials as $t) {
            Testimonial::create($t);
        }

        // 6. Terms & Conditions (Bilingual English & Tamil)
        $terms = [
            [
                'section_type' => 'general',
                'section_number' => '01',
                'title_en' => 'Booking Deposits & Payment',
                'title_ta' => 'முன்பதிவு வைப்புத்தொகை மற்றும் பணம் செலுத்துதல்',
                'content_en' => 'The Client shall make a booking fee (Advance) as per contract to retain the studio to perform the services specified in the contract. Confirmation is granted upon receipt of the deposit.',
                'content_ta' => 'ஒப்பந்தத்தில் குறிப்பிடப்பட்டுள்ள சேவைகளைச் செய்வதற்கு ஸ்டுடியோவைத் தக்கவைத்துக்கொள்வதற்கான ஒப்பந்தத்தின்படி வாடிக்கையாளர் முன்பதிவுக் கட்டணத்தை (முன்கூட்டியே) செலுத்த வேண்டும்.',
                'order' => 1,
            ],
            [
                'section_type' => 'general',
                'section_number' => '02',
                'title_en' => 'Extra Sheets than Budget',
                'title_ta' => 'பட்ஜெட்டை விட கூடுதல் தாள்கள்',
                'content_en' => 'Each sheet that exceeds the agreed budget will be taken as an "Extra Sheet" and will be charged ₹550/- per sheet. For example, if a client’s budget is 25 sheets and the album requires 35 sheets (10 extra sheets), ₹5,500/- will be added to the total package budget.',
                'content_ta' => 'பட்ஜெட்டை விட அதிகமாக உள்ள ஒவ்வொரு தாள் \'கூடுதல் தாள்\' என்று கருதப்பட்டு ₹550/- (1 தாள்) வசூலிக்கப்படும். எடுத்துக்காட்டாக, வாடிக்கையாளர்களின் பட்ஜெட் தாள்கள் 25 ஆகும், மேலும் பட்ஜெட்டை விட 10 தாள்கள் அதிகமாக இருக்கும்போது, ஒவ்வொன்றிற்கும் ₹550/- வசூலிக்கப்பட்டு, பட்ஜெட்டின் விலை ₹5,500/- சேர்க்கப்படும்.',
                'order' => 2,
            ],
            [
                'section_type' => 'general',
                'section_number' => '03',
                'title_en' => 'Album Printing & Payment Milestones',
                'title_ta' => 'ஆல்பம் மற்றும் கட்டண தவணைகள்',
                'content_en' => 'For programs including an album: 25% of the package amount should be paid as pre-booking advance, 50% after the shoot/program, and the remaining 25% before the albums are sent to print.',
                'content_ta' => 'ஆல்பம் உள்ளடக்கிய சேவைகளுக்கு: பட்ஜெட் தொகையில் 25% முன்கூட்டியே முன்பதிவு முன்பணமாக வழங்கப்பட வேண்டும். 50% தொகை நிகழ்ச்சி முடிந்த பிறகு, மற்றொரு 25% தொகை ஆல்பங்கள் அச்சிடப்படுவதற்கு முன்பு வழங்கப்பட வேண்டும்.',
                'order' => 3,
            ],
            [
                'section_type' => 'general',
                'section_number' => '04',
                'title_en' => 'Cancellations & Rescheduling',
                'title_ta' => 'ரத்துசெய்தல் மற்றும் தேதி மாற்றம்',
                'content_en' => 'If the client cancels at least four (4) calendar days prior to the shoot, the booking fee is refundable or transferable if the date is re-booked. Cancellations within 4 calendar days are non-refundable.',
                'content_ta' => 'புகைப்படம் எடுக்கும் நாளுக்கு நான்கு (4) காலண்டர் நாட்களுக்கு முன்னர் வாடிக்கையாளர் இந்த ஒப்பந்தத்தை ரத்து செய்தால் முன்பதிவுக் கட்டணம் திரும்பப் பெறப்படும். 4 நாட்களுக்குள் ரத்து செய்யப்பட்டால் முன்பதிவுக் கட்டணம் திரும்பப் பெற முடியாது.',
                'order' => 4,
            ],
            [
                'section_type' => 'general',
                'section_number' => '05',
                'title_en' => 'Photographic Materials & Copyright',
                'title_ta' => 'புகைப்படப் பொருட்கள் மற்றும் பதிப்புரிமை',
                'content_en' => 'All original RAW files, photos, and videos remain the exclusive property and copyright of the Photographer. The photographer may use images for exhibition, portfolio, website, and promotional purposes.',
                'content_ta' => 'அசல் RAW கோப்புகள் புகைப்படங்கள் மற்றும் வீடியோக்கள் அனைத்தும் புகைப்படக் கலைஞரின் பிரத்யேக சொத்தாக இருக்கும். புகைப்படக் கலைஞர் அனைத்து படங்களுக்கும் பதிப்புரிமை பெற்று விளம்பர மற்றும் போர்ட்ஃபோலியோ நோக்கங்களுக்காகப் பயன்படுத்தலாம்.',
                'order' => 5,
            ],
            // Toddler specific terms
            [
                'section_type' => 'toddlers',
                'section_number' => 'T-01',
                'title_en' => 'Theme Pricing & Confirmation',
                'title_ta' => 'தீம் கட்டணம் மற்றும் முன்பதிவு உறுதி',
                'content_en' => 'Each theme starts at ₹2,500/-, which covers the specific theme setup and outfit. If the outfit is changed to a separate concept, it will be considered an additional theme. Sessions are confirmed only after advance payment.',
                'content_ta' => 'ஒவ்வொரு தீமிற்கும் ₹2,500/- கட்டணம். அதில் குறிப்பிட்ட தீம் மற்றும் ஆடை அடங்கும். ஆடை மாற்றப்பட்டால் அது அடுத்த தீமாக கருதப்படும்.',
                'order' => 6,
            ],
            [
                'section_type' => 'toddlers',
                'section_number' => 'T-02',
                'title_en' => 'Age, Safety & Parental Supervision',
                'title_ta' => 'வயது, பாதுகாப்பு மற்றும் பெற்றோரின் மேற்பார்வை',
                'content_en' => 'Newborn sessions are best conducted within 5–15 days of birth (extendable up to 30 days depending on weight and sleep cycle). Toddler sessions are suited for ages 1–3. A parent or legal guardian must always be present in the studio during the shoot.',
                'content_ta' => 'புதிதாகப் பிறந்த குழந்தைகள் புகைப்படம் எடுப்பது 5–15 நாட்களுக்குள் சிறந்தது. குழந்தைகளின் பாதுகாப்பிற்காக படப்பிடிப்பின் போது பெற்றோர் கட்டாயம் உடன் இருக்க வேண்டும்.',
                'order' => 7,
            ],
            [
                'section_type' => 'toddlers',
                'section_number' => 'T-03',
                'title_en' => 'Hygiene, Props & Home Shoots',
                'title_ta' => 'சுகாதாரம் மற்றும் உபகரணங்கள்',
                'content_en' => 'All wraps, baskets, and props are thoroughly sanitized after each session. For home shoots, travel is free within 20km radius from Krishnagiri. Parents should bring extra diapers, wipes, and milk.',
                'content_ta' => 'அனைத்து உடைகள் மற்றும் பொருட்கள் படப்பிடிப்பு முடிந்ததும் தூய்மைப்படுத்தப்படுகின்றன. கிருஷ்ணகிரியிலிருந்து 20 கிமீ சுற்றளவுக்குள் வீட்டிற்கு வந்து படம் எடுக்க கூடுதல் பயண கட்டணம் இல்லை.',
                'order' => 8,
            ],
        ];

        foreach ($terms as $t) {
            TermsCondition::create($t);
        }

        // 7. Sample Initial Enquiries
        $enquiries = [
            [
                'type' => 'wedding_event',
                'name' => 'Karthik & Divya',
                'email' => 'karthik.divya@gmail.com',
                'phone' => '+91-9876543210',
                'event_type' => 'Weddings & Reception',
                'event_date' => '2026-12-14',
                'location' => 'Krishnagiri Grand Mandapam',
                'selected_package' => 'Namma Veetu Kalyanam Cinema',
                'message' => 'Looking for complete traditional muhurtham and evening reception 4K coverage with candid team.',
                'status' => 'confirmed',
            ],
            [
                'type' => 'newborn_toddler',
                'name' => 'Priya Venkatesh',
                'email' => 'priya.venkat@outlook.com',
                'phone' => '+91-9500112233',
                'parent_name' => 'Priya & Venkatesh',
                'baby_name' => 'Kutty Rithvik',
                'baby_age' => '1 Year',
                'event_type' => 'First Birthday Cake Smash',
                'event_date' => '2026-11-28',
                'location' => 'The Creative Space, Krishnagiri',
                'selected_package' => 'Little Stars (3 Themes)',
                'message' => 'Interested in Jungle theme and Chef theme for our baby boy.',
                'status' => 'new',
            ],
            [
                'type' => 'wedding_event',
                'name' => 'Harish & Sneha',
                'email' => 'harish.sneha@gmail.com',
                'phone' => '+91-9988776655',
                'event_type' => 'Pre-Wedding Outdoor Shoot',
                'event_date' => '2026-12-05',
                'location' => 'Krishnagiri Hills Sunset Point',
                'selected_package' => 'Golden Hour Couple Reverie',
                'message' => 'Would love natural landscape shots with drone video.',
                'status' => 'confirmed',
            ],
            [
                'type' => 'newborn_toddler',
                'name' => 'Suresh & Malathi',
                'email' => 'suresh.m@gmail.com',
                'phone' => '+91-9444332211',
                'parent_name' => 'Suresh Kumar',
                'baby_name' => 'Baby Ananya',
                'baby_age' => '18 Days',
                'event_type' => 'Newborn Serenity Shoot',
                'event_date' => '2026-11-22',
                'location' => 'Home Shoot (Krishnagiri)',
                'selected_package' => 'Sweet Beginnings (2 Themes)',
                'message' => 'Soft wool wraps and peaceful sleeping baby poses.',
                'status' => 'contacted',
            ],
            [
                'type' => 'general',
                'name' => 'Dr. Rajesh Sundar',
                'email' => 'rajesh.doc@gmail.com',
                'phone' => '+91-9123456789',
                'event_type' => 'Family Heirloom Photobook',
                'event_date' => '2026-11-30',
                'location' => 'Raavan Work Space Atelier',
                'selected_package' => 'Italian Linen Archival Layflat',
                'message' => 'Want to print our parents 50th anniversary album with debossed gold title.',
                'status' => 'new',
            ],
            [
                'type' => 'general',
                'name' => 'Deepika S.',
                'email' => 'deepika.s@yahoo.com',
                'phone' => '+91-9840123456',
                'event_type' => 'Maternity Grace Shoot',
                'event_date' => '2026-12-02',
                'location' => 'Outdoor & Studio Concept',
                'selected_package' => 'Sacred Grace Maternity Collection',
                'message' => 'Inquiring for gown concepts and gentle indoor lighting portraits.',
                'status' => 'confirmed',
            ],
        ];

        foreach ($enquiries as $enq) {
            Enquiry::create($enq);
        }
    }
}
