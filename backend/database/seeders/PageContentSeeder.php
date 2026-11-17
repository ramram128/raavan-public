<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PageContent;

class PageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            'home' => [
                'hero_slides' => [
                    [
                        'image' => '/banners/banner_wedding.jpg',
                        'alt' => 'Wedding Photography by Raavan Studio\'z Krishnagiri',
                        'title' => 'Preserving Every Precious Wedding Moment.',
                        'subtitle' => 'Traditional wedding rituals, candid family smiles, and cinematic wedding films. Led by Gowtham Raj with 8+ years of photography experience.',
                        'primaryCta' => ['label' => 'View Wedding Gallery ↗', 'path' => '/gallery'],
                        'secondaryCta' => ['label' => 'Book a Session', 'path' => '/contact'],
                    ],
                    [
                        'image' => '/banners/banner_toddler.jpg',
                        'alt' => 'Toddlers by Raavan baby milestone photography',
                        'title' => 'Cute Baby Milestones & Newborn Portraits.',
                        'subtitle' => 'Krishnagiri\'s dedicated baby studio with 15+ colorful themes, safe props, cute costumes, and comfortable suites for your little one.',
                        'primaryCta' => ['label' => 'View Baby Packages ↗', 'path' => '/pricing'],
                        'secondaryCta' => ['label' => 'Book a Session', 'path' => '/contact'],
                    ],
                    [
                        'image' => '/banners/banner_couple.jpg',
                        'alt' => 'Outdoor Pre-Wedding photography at Krishnagiri Hills',
                        'title' => 'Romantic Outdoor & Pre-Wedding Shoots.',
                        'subtitle' => 'Natural couple portraits amidst Krishnagiri Hills, sunset golden-hour views, and relaxed outdoor sessions you\'ll cherish forever.',
                        'primaryCta' => ['label' => 'Explore Outdoor Shoots ↗', 'path' => '/services'],
                        'secondaryCta' => ['label' => 'Book a Session', 'path' => '/contact'],
                    ],
                ],
                'about_intro' => [
                    'tag' => 'ABOUT THE ARTIST',
                    'title' => 'Passionate Visual Storyteller in Krishnagiri',
                    'bio' => 'Raavan Studio’z was established in 2021 by Mr. Gowtham Raj with a singular vision: to photograph candid, heartfelt, and cinematic emotions without artificial posing.',
                    'bio2' => 'We operate two dedicated studios in Krishnagiri: The Creative Space designed exclusively for newborn, infant, and toddler shoots, and Work Space for wedding consultations, couple photography, and video editing.',
                    'image1' => '/banners/banner_wedding.jpg',
                    'image2' => '/banners/banner_toddler.jpg',
                    'stat1_val' => '8+',
                    'stat1_label' => 'Years Experience',
                    'stat2_val' => '1,500+',
                    'stat2_label' => 'Happy Clients',
                    'stat3_val' => '5.0 ★',
                    'stat3_label' => 'Client Reviews',
                    'ctaLabel' => 'Discover Our Full Story ↗',
                    'ctaPath' => '/about',
                    'whatsappBtnText' => 'Chat on WhatsApp',
                ],
                'wedding_block' => [
                    'tag' => 'NAMMA VEETU KALYANAM',
                    'title' => 'Preserving Every Precious Wedding Moment',
                    'description' => 'From solemn muhurtham rituals to unscripted reception laughter, we capture every emotional nuance with prime lenses and natural cinema color grading.',
                    'buttonLabel' => 'View Wedding Collections ↗',
                    'buttonPath' => '/gallery',
                ],
                'outdoor_block' => [
                    'tag' => 'ROMANTIC HILLS & SUNSETS',
                    'title' => 'Krishnagiri Outdoor & Pre-Wedding Shoots',
                    'description' => 'Golden hour hillscapes, lakeside strolls, and candid frames that capture your true chemistry away from stiff studio lights.',
                    'buttonLabel' => 'Explore Pre-Wedding Shoots ↗',
                    'buttonPath' => '/services',
                ],
                'toddler_block' => [
                    'tag' => 'TODDLERS BY RAAVAN',
                    'title' => 'Baby Milestones & Newborn Portraits',
                    'description' => 'Krishnagiri’s temperature-controlled baby photo suite. Safe props, sanitary sanitization, and 15+ playful themes for babies 5 days to 3 years.',
                    'buttonLabel' => 'View Baby Packages ↗',
                    'buttonPath' => '/kutty-chutties',
                ],
                'quick_booking' => [
                    'title' => 'Plan Your Photography Session',
                    'subtitle' => 'Tell us about your event date or baby milestone. Mr. Gowtham Raj and our team will get back to you with custom packages and immediate confirmation.',
                    'whatsappBtnText' => 'Book via WhatsApp Direct',
                ],
            ],

            'about' => [
                'hero' => [
                    'tag' => 'OUR ORIGIN STORY',
                    'title' => 'Crafting Cinematic Heirlooms From Unscripted Moments',
                    'subtitle' => 'Founded in Krishnagiri by Mr. Gowtham Raj in 2021, Raavan Studio’z blends high-end cinema optics with deeply rooted cultural storytelling.',
                ],
                'philosophy' => [
                    ['title' => 'Light Over Poses', 'description' => 'Natural ambient light and gentle guidance instead of rigid unnatural postures.'],
                    ['title' => 'Authentic Human Emotion', 'description' => 'Unscripted laughter, joyous tears, and raw family moments that stay evergreen.'],
                    ['title' => 'Archival Craftsmanship', 'description' => 'Color-graded cinematic photos and handcrafted heirloom albums built to last generations.'],
                    ['title' => 'Uncompromising Safety', 'description' => 'Sanitized baby suites, child-friendly certified props, and gentle pacifying sessions.'],
                ],
                'process_steps' => [
                    ['step' => '01', 'title' => 'First Hello', 'desc' => 'Consultation over phone, WhatsApp, or at our Krishnagiri studio.'],
                    ['step' => '02', 'title' => 'Creative Planning', 'desc' => 'Moodboards, costume guidance, timeline coordination, and theme selection.'],
                    ['step' => '03', 'title' => 'The Shoot Day', 'desc' => 'Relaxed, guided shoot with multi-angle cinema cameras and prime lenses.'],
                    ['step' => '04', 'title' => 'Delivery & Albums', 'desc' => 'High-resolution digital gallery and premium photobooks delivered on time.'],
                ],
                'cta' => [
                    'title' => 'Let\'s Tell Your Visual Story Together',
                    'subtitle' => 'Whether it’s a grand multi-day wedding or a precious 1st birthday milestone, we’d love to meet you.',
                    'buttonLabel' => 'Start a Conversation',
                    'buttonPath' => '/contact',
                ],
            ],

            'kutty_chutties' => [
                'hero' => [
                    'brandTag' => 'RAAVAN KUTTY CHUTTIES',
                    'headline' => 'Krishnagiri\'s Premier Baby Milestone Studio',
                    'subheadline' => '15+ colorful themes, sanitized props, temperature-regulated nursery suite, and patient gentle photography for newborns & toddlers.',
                    'primaryBtnLabel' => 'Explore Baby Packages ↗',
                    'primaryBtnPath' => '#packages-grid',
                    'whatsappBtnLabel' => 'Check Available Slots on WhatsApp',
                ],
                'safety_banner' => [
                    'title' => '100% Baby-Safe & Sanitized Environment',
                    'description' => 'Our dedicated baby floor is deep-cleaned and temperature-monitored before every single toddler session.',
                ],
            ],

            'pricing' => [
                'banner' => [
                    'tag' => 'INVESTMENT & PACKAGES',
                    'title' => 'Transparent Pricing With No Hidden Fees',
                    'subtitle' => 'Every package includes raw footage options, high-resolution color-graded edits, and customized heirloom photobooks.',
                ],
                'payment_schedule' => [
                    ['step' => '01', 'pct' => '25%', 'title' => 'Advance Booking', 'desc' => 'Secures your preferred date and crew assignment.'],
                    ['step' => '02', 'pct' => '50%', 'title' => 'On Shoot Day', 'desc' => 'Payable on the day of the shoot / wedding event.'],
                    ['step' => '03', 'pct' => '25%', 'title' => 'On Album Delivery', 'desc' => 'Paid after final photo review and album approval.'],
                ],
            ],

            'contact' => [
                'header' => [
                    'tag' => 'GET IN TOUCH',
                    'title' => 'Visit Our Krishnagiri Studios or Message Us',
                    'subtitle' => 'We welcome you to visit our Creative Space on the highway or Work Space near Pillayar Kovil.',
                ],
                'hours' => 'Monday to Sunday: 9:00 AM – 9:00 PM',
                'whatsapp_cta' => 'Chat Directly with Gowtham Raj on WhatsApp',
            ],
        ];

        foreach ($pages as $pageKey => $sections) {
            PageContent::updateOrCreate(
                ['page' => $pageKey],
                ['sections' => $sections]
            );
        }
    }
}
