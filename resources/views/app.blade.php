<!DOCTYPE html>
@php
    $seoBrand        = trim((string) (getSetting('titleText') ?? config('app.name') ?? 'Coachlinks')) ?: 'Coachlinks';
    $seoDefaultTitle = $seoBrand . ' — Digital Business Cards, Bio Links & Coaching Growth';
    $seoDescription  = trim((string) getSetting('metaDescription', 'Coachlinks helps coaches and creators launch stunning digital business cards, bio links, lead magnets, and booking pages in minutes. Grow your coaching business with one branded link.'));
    $seoKeywords     = trim((string) getSetting('metaKeywords', 'coach digital business card, coach bio link, coach website builder, life coach card, fitness coach landing page, coaching lead magnets, booking link for coaches, online business card, link in bio for coaches, coach marketing tool'));
    $seoImage        = getSetting('ogImage');
    if (!$seoImage) {
        $seoImage = asset('images/logos/logo.png');
    } elseif (!preg_match('/^https?:\/\//i', $seoImage)) {
        $seoImage = url(ltrim($seoImage, '/'));
    }
    $seoFavicon = getSetting('favicon');
    if (!$seoFavicon) {
        $seoFavicon = asset('images/logos/favicon.ico');
    } elseif (!preg_match('/^https?:\/\//i', $seoFavicon)) {
        $seoFavicon = url(ltrim($seoFavicon, '/'));
    }
    $seoCanonical = url()->current();
    $seoLocale    = str_replace('_', '-', $page['props']['auth']['lang'] ?? app()->getLocale());
@endphp
<html lang="{{ $seoLocale }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <base href="{{ \Illuminate\Support\Facades\Request::getBasePath() }}">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Primary SEO --}}
        <title inertia>{{ $seoDefaultTitle }}</title>
        <meta inertia="description" name="description" content="{{ $seoDescription }}">
        <meta inertia="keywords" name="keywords" content="{{ $seoKeywords }}">
        <meta name="author" content="{{ $seoBrand }}">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="googlebot" content="index, follow">
        <meta name="theme-color" content="#0f172a">
        <meta name="format-detection" content="telephone=no">
        <link inertia="canonical" rel="canonical" href="{{ $seoCanonical }}">
        <link rel="icon" type="image/x-icon" href="{{ $seoFavicon }}">
        <link rel="shortcut icon" href="{{ $seoFavicon }}">
        <link rel="apple-touch-icon" href="{{ asset('images/logos/icon-192x192.png') }}">

        {{-- Open Graph / Facebook --}}
        <meta inertia="og:type" property="og:type" content="website">
        <meta inertia="og:site_name" property="og:site_name" content="{{ $seoBrand }}">
        <meta inertia="og:title" property="og:title" content="{{ $seoDefaultTitle }}">
        <meta inertia="og:description" property="og:description" content="{{ $seoDescription }}">
        <meta inertia="og:url" property="og:url" content="{{ $seoCanonical }}">
        <meta inertia="og:image" property="og:image" content="{{ $seoImage }}">
        <meta inertia="og:image:alt" property="og:image:alt" content="{{ $seoBrand }} — Digital business cards & bio links for coaches">
        <meta property="og:locale" content="{{ str_replace('-', '_', $seoLocale) }}">

        {{-- Twitter Card --}}
        <meta inertia="twitter:card" name="twitter:card" content="summary_large_image">
        <meta inertia="twitter:title" name="twitter:title" content="{{ $seoDefaultTitle }}">
        <meta inertia="twitter:description" name="twitter:description" content="{{ $seoDescription }}">
        <meta inertia="twitter:image" name="twitter:image" content="{{ $seoImage }}">

        {{-- Structured Data: Organization --}}
        <script type="application/ld+json">
            {!! json_encode([
                '@context'    => 'https://schema.org',
                '@type'       => 'Organization',
                'name'        => $seoBrand,
                'url'         => url('/'),
                'logo'        => $seoImage,
                'description' => $seoDescription,
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
        </script>
        <script type="application/ld+json">
            {!! json_encode([
                '@context' => 'https://schema.org',
                '@type'    => 'WebSite',
                'name'     => $seoBrand,
                'url'      => url('/'),
                'potentialAction' => [
                    '@type'       => 'SearchAction',
                    'target'      => url('/') . '/?s={search_term_string}',
                    'query-input' => 'required name=search_term_string',
                ],
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
        </script>

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <script src="{{ asset('js/jquery.min.js') }}"></script>
        @routes
        @if (app()->environment('local') && file_exists(public_path('hot')))
            @viteReactRefresh
        @endif
        @vite(['resources/js/app.tsx'])
        <script>
            // Ensure base URL is correctly set for assets
            window.baseUrl = '{{ url('/') }}';
            window.APP_URL = '{{ config('app.url') }}';
            window.initialLocale = @json($page['props']['auth']['lang'] ?? 'en');
        </script>
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @if(config('app.is_demo', false))
            @include('announcebar')
        @endif
        @inertia
    </body>
</html>
