# SEO Implementation Guide - Hotel Booking App (Simple Version)

**For:** Intermediate Beginners who know metadata/robots but need practical how-to
**Time Required:** 2-3 hours implementation
**Difficulty:** Easy (copy-paste + minimal code)

---

## Table of Contents

1. [What You Need to Know](#what-you-need-to-know)
2. [Step 1: Setup (15 minutes)](#step-1-setup-15-minutes)
3. [Step 2: Fix Metadata (30 minutes)](#step-2-fix-metadata-30-minutes)
4. [Step 3: Add Schema (20 minutes)](#step-3-add-schema-20-minutes)
5. [Step 4: Deploy & Submit (30 minutes)](#step-4-deploy--submit-30-minutes)
6. [Quick Checklist](#quick-checklist)

---

## Prerequisites

- [ ] Project deployed to Vercel (or self-hosted with Nginx)
- [ ] Backend API live at `https://api.apachepms.io.vn`
- [ ] MongoDB Atlas cluster active (connection verified)
- [ ] Next.js 15.x installed
- [ ] Domain: `yourhotelapp.com` (or similar) configured
- [ ] Google Search Console & Bing Webmaster Tools accounts

---

## Phase 1: Foundation (Weeks 1-2)

### Step 1.1: Create `robots.ts`

**File:** `app/robots.ts`

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin", "/api", "/auth/login"]
      },
      {
        userAgent: "Googlebot",
        allow: ["/"]
      }
    ],
    sitemap: "https://yourhotelapp.com/sitemap.xml",
    host: "https://yourhotelapp.com"
  };
}
```

**Test:**

```bash
curl https://yourhotelapp.com/robots.txt
```

---

### Step 1.2: Create `sitemap.ts`

**File:** `app/sitemap.ts`

```typescript
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yourhotelapp.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${baseUrl}/apartments`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${baseUrl}/villas`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    }
  ];

  // Dynamic: Fetch hotels from API
  try {
    const hotels = await fetch("https://api.apachepms.io.vn/api/hotels", {
      next: { revalidate: 86400 } // Revalidate daily
    })
      .then((res) => res.json())
      .catch(() => []);

    const hotelRoutes = hotels.slice(0, 50000).map((hotel: any) => ({
      url: `${baseUrl}/hotel/${hotel._id || hotel.id}`,
      lastModified: new Date(hotel.updatedAt || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.8
    }));

    return [...staticRoutes, ...hotelRoutes];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return staticRoutes;
  }
}
```

**Test:**

```bash
curl https://yourhotelapp.com/sitemap.xml | head -20
```

---

### Step 1.3: Setup Base Metadata

**File:** `app/layout.tsx`

```typescript
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://yourhotelapp.com'),
  title: {
    default: 'Hotel Booking - Best Rates Guaranteed | YourApp',
    template: '%s | YourApp',
  },
  description: 'Search and book 10,000+ hotels, apartments, villas worldwide. Best prices, instant confirmation. 24/7 support.',
  keywords: [
    'hotel booking',
    'apartments',
    'villas',
    'accommodation',
    'travel deals',
    'luxury stays',
  ],
  authors: [
    {
      name: 'Hotel Booking Team',
      url: 'https://yourhotelapp.com',
    },
  ],
  creator: 'Hotel Booking Platform',
  publisher: 'Hotel Booking Inc',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourhotelapp.com',
    title: 'Hotel Booking - Best Rates Guaranteed',
    description: 'Search and book 10,000+ hotels, apartments, villas worldwide.',
    siteName: 'Hotel Booking',
    images: [
      {
        url: 'https://yourhotelapp.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hotel Booking Platform',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Booking - Best Rates',
    description: 'Browse & book 10,000+ accommodations',
    images: ['https://yourhotelapp.com/twitter-image.jpg'],
    creator: '@hotelbooking',
  },
  alternates: {
    canonical: 'https://yourhotelapp.com',
    languages: {
      'en-US': 'https://yourhotelapp.com',
      'vi-VN': 'https://yourhotelapp.com/vi',
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_CODE',
    yahoo: 'YOUR_YAHOO_CODE',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1f2937',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Phase 2: Dynamic Metadata & Edge Functions

### Step 2.1: Create Edge Function for Metadata

**File:** `lib/metadata-edge.ts`

```typescript
import { headers } from "next/headers";

export interface EdgeMetadata {
  title: string;
  description: string;
  keywords: string;
  country: string;
  device: string;
  currency: string;
  language: string;
}

const CURRENCY_MAP: Record<string, string> = {
  VN: "₫",
  US: "$",
  GB: "£",
  JP: "¥",
  AU: "$",
  SG: "$",
  TH: "฿"
};

const LANGUAGE_MAP: Record<string, string> = {
  VN: "vi",
  US: "en",
  GB: "en",
  JP: "ja",
  AU: "en"
};

export async function getEdgeMetadata(context: {
  type: "hotel" | "apartment" | "villa" | "motel" | "search" | "home";
  id?: string;
  city?: string;
}): Promise<EdgeMetadata> {
  const headersList = await headers();

  // Extract geo/device info from headers
  const country = headersList.get("cf-ipcountry") || "US";
  const device = headersList.get("cf-device-type") || "desktop";
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = device === "mobile" || userAgent.toLowerCase().includes("mobile");

  const currency = CURRENCY_MAP[country] || "$";
  const language = LANGUAGE_MAP[country] || "en";

  let title = "";
  let description = "";
  let keywords = "";

  // Context-specific metadata
  if (context.type === "hotel" && context.id) {
    try {
      const hotel = await fetch(`https://api.apachepms.io.vn/api/hotels/${context.id}`, {
        cache: "revalidate",
        next: { revalidate: 3600 }
      }).then((res) => res.json());

      if (isMobile) {
        title = `${hotel.name} - Book Now | ${currency}${Math.round(hotel.minPrice)}`;
        description = `${hotel.name} in ${hotel.city}. ⭐ ${hotel.rating}/5. Free cancellation. Instant confirmation.`;
      } else {
        title = `${hotel.name} - ${hotel.type} in ${hotel.city} | Luxury Stays`;
        description = `${hotel.description?.slice(0, 120)}... From ${currency}${Math.round(hotel.minPrice)}/night. ${hotel.reviewCount} reviews, ${hotel.rating}/5 rating.`;
      }
      keywords = `${hotel.name}, ${hotel.city}, ${hotel.type}, booking, accommodation, ${country === "VN" ? "khách sạn" : "hotel"}`;
    } catch (error) {
      title = "Luxury Hotel - Book Your Stay";
      description = "Discover luxury accommodations worldwide.";
      keywords = "hotel booking, accommodation";
    }
  } else if (context.type === "search") {
    if (isMobile) {
      title = country === "VN" ? "Tìm & Đặt Khách Sạn Ngay - Giá Tốt" : "Find & Book Hotels - Best Deals";
      description = "Search 10,000+ hotels. Best price filter. Instant booking.";
    } else {
      title =
        country === "VN" ? "Tìm Kiếm Khách Sạn Sang Trọng - So Sánh Giá" : "Search Hotels Worldwide - Compare Prices";
      description = "Browse luxury accommodations. Filter by amenities, price, rating. Read verified reviews.";
    }
    keywords = country === "VN" ? "tìm khách sạn, đặt phòng, giá rẻ" : "hotel search, booking, deals";
  } else if (context.type === "home") {
    if (isMobile) {
      title = country === "VN" ? "Đặt Khách Sạn Rẻ Nhất" : "Book Hotels Fast";
      description = "Search & book instantly. Best rates guaranteed.";
    } else {
      title =
        country === "VN"
          ? "Đặt Khách Sạn Online - Giá Tốt Nhất & Đáng Tin Cậy"
          : "Hotel Booking Platform - Book with Confidence";
      description =
        "Explore 10,000+ properties. Best price guarantee. 24/7 customer support. Free cancellation on most bookings.";
    }
    keywords = country === "VN" ? "đặt khách sạn, booking, du lịch" : "hotel booking, accommodation, travel";
  }

  return {
    title,
    description,
    keywords,
    country,
    device,
    currency,
    language
  };
}
```

---

### Step 2.2: Update Hotel Detail Page

**File:** `app/hotel/[id]/page.tsx`

```typescript
import { Metadata } from 'next';
import { getEdgeMetadata } from '@/lib/metadata-edge';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meta = await getEdgeMetadata({ type: 'hotel', id });

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: `https://yourhotelapp.com/hotel/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://yourhotelapp.com/hotel/${id}`,
    },
  };
}

export default async function HotelPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      {/* Your hotel detail component */}
      <h1>Hotel Details: {id}</h1>
    </div>
  );
}
```

---

### Step 2.3: Update Category Pages (Apartments, Villas, etc.)

**File:** `app/apartments/page.tsx`

```typescript
import { Metadata } from 'next';
import { getEdgeMetadata } from '@/lib/metadata-edge';

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getEdgeMetadata({ type: 'apartment' });

  return {
    title: `Luxury Apartments ${meta.country === 'VN' ? 'Việt Nam' : 'Worldwide'} - Book Now`,
    description: meta.description || 'Find and book luxury apartments worldwide.',
    keywords: 'apartments, vacation rentals, apartment booking',
    openGraph: {
      title: 'Luxury Apartments - Book Now',
      description: 'Browse premium apartments',
    },
  };
}

export default function ApartmentsPage() {
  return (
    <div>
      {/* Your apartments listing */}
      <h1>Luxury Apartments</h1>
    </div>
  );
}
```

**Repeat for:** `app/villas/page.tsx`, `app/motel/page.tsx`, `app/homestays/page.tsx`

---

## Phase 3: Structured Data & Schema Markup

### Step 3.1: Create Schema Component

**File:** `components/schema/HotelSchema.tsx`

```typescript
export interface HotelSchemaProps {
  hotel: {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    rating: number;
    reviewCount: number;
    minPrice: number;
    image: string;
    type: string;
  };
}

export function HotelSchema({ hotel }: HotelSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotel.name,
    description: hotel.description,
    image: hotel.image,
    address: {
      '@type': 'PostalAddress',
      streetAddress: hotel.address,
      addressLocality: hotel.city,
      addressCountry: 'VN',
      postalCode: '10000',
    },
    priceRange: `$${hotel.minPrice}-$${hotel.minPrice * 2}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: hotel.rating,
      bestRating: '5',
      worstRating: '1',
      ratingCount: hotel.reviewCount,
    },
    telephone: '+84-xxx-xxx-xxx',
    url: `https://yourhotelapp.com/hotel/${hotel.id}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

### Step 3.2: Add Schema to Hotel Page

Update **`app/hotel/[id]/page.tsx`**:

```typescript
import { HotelSchema } from '@/components/schema/HotelSchema';

export default async function HotelPage({ params }: Props) {
  const { id } = await params;
  const hotel = await fetch(`https://api.apachepms.io.vn/api/hotels/${id}`)
    .then(res => res.json());

  return (
    <>
      <HotelSchema hotel={hotel} />
      {/* Rest of page */}
    </>
  );
}
```

---

### Step 3.3: Create Breadcrumb Schema Component

**File:** `components/schema/BreadcrumbSchema.tsx`

```typescript
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## Phase 4: Performance & Core Web Vitals

### Step 4.1: Optimize Images

**File:** `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp", "image/png"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.apachepms.io.vn"
      }
    ]
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true
};

export default nextConfig;
```

---

### Step 4.2: Add Performance Monitoring

**File:** `app/layout.tsx` (update)

```typescript
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

Install dependencies:

```bash
npm install @vercel/analytics @vercel/speed-insights
```

---

### Step 4.3: Implement ISR (Incremental Static Regeneration)

**File:** `app/hotels/page.tsx`

```typescript
export const revalidate = 3600; // Revalidate every hour

export default async function HotelsPage() {
  const hotels = await fetch('https://api.apachepms.io.vn/api/hotels', {
    next: { revalidate: 3600 },
  }).then(res => res.json());

  return (
    <div>
      {hotels.map(hotel => (
        <div key={hotel.id}>{hotel.name}</div>
      ))}
    </div>
  );
}
```

---

## Phase 5: Launch & Monitoring

### Step 5.1: Submit to Search Engines

**Google Search Console:**

```bash
1. Go to https://search.google.com/search-console
2. Add property: yourhotelapp.com
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: https://yourhotelapp.com/sitemap.xml
5. Request indexing for key pages
```

**Bing Webmaster Tools:**

```bash
1. Go to https://www.bing.com/webmasters
2. Add site
3. Verify ownership
4. Submit sitemap
```

---

### Step 5.2: Monitor Core Web Vitals

Create **`lib/web-vitals.ts`**:

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log("Web Vital:", metric);

  // Optional: Send to external service
  // fetch('/api/web-vitals', { method: 'POST', body: JSON.stringify(metric) });
}

export function reportWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}
```

---

### Step 5.3: Setup Monitoring Dashboard

**Vercel Dashboard:**

```
1. Login to Vercel
2. Select project
3. Analytics tab
4. View Core Web Vitals, Performance metrics
5. Set alerts for performance degradation
```

---

### Step 5.4: Create SEO Audit Checklist API Route

**File:** `app/api/seo-audit/route.ts`

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://yourhotelapp.com";
  const checks = [];

  // Check 1: Robots.txt
  try {
    const robots = await fetch(`${baseUrl}/robots.txt`);
    checks.push({
      name: "robots.txt",
      status: robots.ok ? "PASS" : "FAIL"
    });
  } catch {
    checks.push({ name: "robots.txt", status: "ERROR" });
  }

  // Check 2: Sitemap.xml
  try {
    const sitemap = await fetch(`${baseUrl}/sitemap.xml`);
    checks.push({
      name: "sitemap.xml",
      status: sitemap.ok ? "PASS" : "FAIL"
    });
  } catch {
    checks.push({ name: "sitemap.xml", status: "ERROR" });
  }

  // Check 3: Homepage metadata
  try {
    const homepage = await fetch(baseUrl);
    const html = await homepage.text();
    const hasMeta = html.includes("og:title") && html.includes("description");
    checks.push({
      name: "Homepage Metadata",
      status: hasMeta ? "PASS" : "FAIL"
    });
  } catch {
    checks.push({ name: "Homepage Metadata", status: "ERROR" });
  }

  // Check 4: Mobile responsiveness (basic check via headers)
  checks.push({ name: "Mobile Responsive", status: "MANUAL CHECK REQUIRED" });

  return NextResponse.json({ checks, timestamp: new Date() });
}
```

Test:

```bash
curl https://yourhotelapp.com/api/seo-audit
```

---

## Troubleshooting

### Issue: Metadata not changing per region

**Solution:** Verify Vercel deployment is using Edge Functions:

```bash
vercel logs --follow
# Look for "Edge Region" in logs
```

### Issue: Sitemap too large

**Solution:** Implement pagination:

```typescript
// In sitemap.ts
const hotels = await fetch("...?limit=50000&page=1").then((res) => res.json());
```

### Issue: Google not indexing pages

**Solutions:**

1. Check GSC → Coverage → Errors
2. Ensure no `noindex` in metadata
3. Check robots.txt allows crawling
4. Verify domain verification in GSC

### Issue: Core Web Vitals failing

**Solutions:**

1. Implement Image optimization (see Phase 4.1)
2. Use dynamic imports for large components
3. Implement lazy loading for initial content
4. Use `experimental.optimizePackageImports` in next.config

---

## Checklist

### Pre-Launch

- [ ] robots.ts created and accessible
- [ ] sitemap.ts created and accessible
- [ ] Base metadata in layout.tsx
- [ ] Edge Functions implemented
- [ ] Hotel/Apartment/Villa pages have dynamic metadata
- [ ] Schema markup added (Hotel, Breadcrumb)
- [ ] Images optimized with next/image
- [ ] Core Web Vitals monitoring active
- [ ] Canonical URLs properly set
- [ ] Mobile responsive verified

### Launch Day

- [ ] Deploy to Vercel
- [ ] Verify sitemap generation
- [ ] Verify robots.txt
- [ ] Verify metadata on production
- [ ] Test from different countries/devices
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify domain ownership in both tools

### Week 1 Post-Launch

- [ ] Monitor GSC for crawl errors
- [ ] Check indexation status
- [ ] Monitor Core Web Vitals
- [ ] Verify search results (SERP appearance)
- [ ] Check mobile-first indexing status

### Ongoing (Monthly)

- [ ] Review Google Search Console data
- [ ] Monitor keyword rankings
- [ ] Check for new errors/warnings
- [ ] Update content (add new hotels/amenities)
- [ ] Review competitor SEO tactics
- [ ] Audition new schema markup types

---

## Useful Commands

```bash
# Build and analyze
npm run build

# Test locally
npm run dev

# Lint
npm run lint

# Check Core Web Vitals locally
vercel dev

# Check SEO (after deployment)
curl https://yourhotelapp.com/robots.txt
curl https://yourhotelapp.com/sitemap.xml
curl https://yourhotelapp.com/api/seo-audit
```

---

## Resources

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Web Vitals](https://web.dev/vitals/)
- [Schema.org Documentation](https://schema.org/)
- [Vercel Analytics](https://vercel.com/analytics)

---

## Questions & Support

For issues or questions:

1. Check Troubleshooting section above
2. Review Next.js documentation
3. Check Vercel deployment logs: `vercel logs`
4. Use Google Search Console for crawl errors
5. Test tools: [SEO Audit Tool](https://www.seobility.net/), [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

**Last Updated:** April 3, 2026
**Status:** Ready for Implementation
