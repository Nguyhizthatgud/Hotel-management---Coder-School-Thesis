# Simple SEO Guide for Hotel Booking App

**For Intermediate Beginners | 2-3 Hours Implementation**

---

## Your Level: 5-6/10 (Intermediate Beginner ✓)

You know:

- ✅ Metadata, Open Graph, robots.txt
- ✅ Basic SEO concepts
- ❌ How to implement it (that's what we're fixing)

---

## What Actually Matters (Top 5)

1. **Fast loading** (images, CSS/JS load speed) → Ranks #1
2. **Mobile friendly** (responsive design) → Ranks #2
3. **Good content** (real hotel info, reviews) → Ranks #3
4. **Metadata** (title, description) → Ranks #4
5. **Schema** (structured data about hotel) → Ranks #5

❌ Keywords in description (Google ignores)
❌ Facebook tags (not needed unless posting)
❌ Fancy animations (slows page)

---

## Step 1: Setup Files (15 minutes)

### 1A: Create `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://yourhotelapp.com/sitemap.xml
```

### 1B: Create `app/robots.ts`

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"]
    },
    sitemap: "https://yourhotelapp.com/sitemap.xml"
  };
}
```

### 1C: Create `app/sitemap.ts`

```typescript
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yourhotelapp.com";

  // Static pages
  const pages = [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/hotels`, priority: 0.9 },
    { url: `${baseUrl}/apartments`, priority: 0.9 },
    { url: `${baseUrl}/villas`, priority: 0.9 },
    { url: `${baseUrl}/about`, priority: 0.5 }
  ];

  // Get all hotels from API
  const hotels = await fetch("https://api.apachepms.io.vn/api/hotels")
    .then((res) => res.json())
    .catch(() => []);

  const hotelPages = hotels.map((h: any) => ({
    url: `${baseUrl}/hotel/${h._id}`,
    priority: 0.8
  }));

  return [...pages, ...hotelPages];
}
```

✅ **Test:**

```bash
curl https://yourhotelapp.com/robots.txt
curl https://yourhotelapp.com/sitemap.xml
```

---

## Step 2: Fix Metadata (30 minutes)

This is **80% of SEO value**.

### Update `app/layout.tsx`

Replace your `export const metadata` with:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourhotelapp.com"),

  // Homepage
  title: "Hotel Booking Platform - Best Rates 2026 | YourApp",
  description:
    "Search 10,000+ hotels, apartments, villas worldwide. Best price guarantee. Free cancellation. Book in 60 seconds.",
  keywords: "hotel booking, apartments, villas, accommodation, travel deals",

  // Facebook/LinkedIn/WhatsApp preview
  openGraph: {
    title: "Hotel Booking - Best Rates Guaranteed",
    description: "Find and book luxury hotels worldwide",
    url: "https://yourhotelapp.com",
    siteName: "Hotel Booking App",
    type: "website",
    images: [
      {
        url: "https://yourhotelapp.com/og-image.jpg", // Create this 1200x630px image
        width: 1200,
        height: 630,
        alt: "Hotel Booking Platform"
      }
    ]
  },

  // Twitter/X preview
  twitter: {
    card: "summary_large_image",
    title: "Hotel Booking - Best Rates",
    description: "Book 10,000+ hotels worldwide"
  },

  // Tell Google to index this
  robots: {
    index: true,
    follow: true
  }
};
```

### Update Individual Hotel Pages

For **`app/hotel/[id]/page.tsx`**:

```typescript
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const hotel = await fetch(`https://api.apachepms.io.vn/api/hotels/${id}`)
    .then(res => res.json());

  return {
    title: `${hotel.name} in ${hotel.city} - Book Now | YourApp`,
    description: `${hotel.name} - ⭐ ${hotel.rating}/5 (${hotel.reviewCount} reviews). From $${hotel.minPrice}/night. Free cancellation.`,
    openGraph: {
      title: hotel.name,
      description: `${hotel.name} in ${hotel.city} - From $${hotel.minPrice}/night`,
      images: [{ url: hotel.image }],
    },
  };
}

export default async function HotelPage({ params }: Props) {
  const { id } = await params;
  // Your page content
  return <div>Hotel: {id}</div>;
}
```

**Repeat for:**

- `app/apartments/[id]/page.tsx`
- `app/villas/[id]/page.tsx`

✅ **Test locally:**

```bash
npm run build
npm run start
# Visit http://localhost:3000 in browser
# Right-click → View Source
# Search for: <title>, <meta name="description">
```

---

## Step 3: Add Schema (20 minutes)

Schema = tells Google "This is a HOTEL with 4.5 stars"

### Create `components/HotelSchema.tsx`

```typescript
export function HotelSchema({ hotel }: { hotel: any }) {
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
    },
    priceRange: `$${hotel.minPrice}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: hotel.rating,
      bestRating: '5',
      worstRating: '1',
      ratingCount: hotel.reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Add to Hotel Page

Update `app/hotel/[id]/page.tsx`:

```typescript
import { HotelSchema } from '@/components/HotelSchema';

export default async function HotelPage({ params }: Props) {
  const { id } = await params;
  const hotel = await fetch(`https://api.apachepms.io.vn/api/hotels/${id}`)
    .then(res => res.json());

  return (
    <>
      <HotelSchema hotel={hotel} />
      {/* Your page content */}
    </>
  );
}
```

✅ **Test schema:**

```bash
# Go to: https://schema.org/validator
# Paste your hotel URL
# Should show: Hotel ✓, Rating ✓, Price ✓
```

---

## Step 4: Deploy & Submit (30 minutes)

### 4.1 Deploy to Vercel

```bash
cd your-frontend-directory
npm run build
vercel --prod
```

Your site is now live: `https://yourhotelapp.vercel.app`

### 4.2 Add to Google

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add property** → Enter: `https://yourhotelapp.com`
3. Verify ownership (easiest: HTML file upload)
4. Go to **Sitemaps** → Submit: `https://yourhotelapp.com/sitemap.xml`
5. Wait 24 hours

### 4.3 Check Results (1 Week Later)

In Google Search Console:

- **Performance:** See what keywords you rank for
- **Coverage:** See which pages got indexed
- **Enhancements:** See schema issues (if any)

---

## Before & After

### ❌ Bad (Before)

```html
<title>Hotel</title> <meta name="description" content="" />
```

### ✅ Good (After)

```html
<title>Riverside Hotel in Bangkok - Book Now | YourApp</title>
<meta name="description" content="Riverside Hotel - ⭐ 4.5/5 (320 reviews). From $45/night. Free cancellation." />
<meta property="og:image" content="..." />
```

---

## Quick Checklist

**Before Launch:**

- [ ] robots.txt created
- [ ] sitemap.ts created
- [ ] Homepage metadata filled
- [ ] Hotel page metadata filled
- [ ] Schema added to hotel page
- [ ] Mobile responsive (test on phone)

**Launch Day:**

- [ ] Deploy to Vercel
- [ ] Test sitemap: `https://yourhotelapp.com/sitemap.xml`
- [ ] Test metadata: View source → see title/description
- [ ] Submit to Google Search Console

**After 1 Week:**

- [ ] Check GSC → **Coverage** (indexed pages?)
- [ ] Check Google: `site:yourhotelapp.com` (shows pages?)
- [ ] Check GSC → **Performance** (any keywords?)

---

## Common Mistakes (DON'T DO THIS)

❌ Repeat "hotel" 100x (keyword stuffing)
❌ Fake reviews in schema (Google catches this)
❌ Hide text (white text on white = bad)
❌ Block Google in robots.txt = no indexing
❌ Use `noindex` accidentally = disappears from search
❌ Copy competitor content (plagiarism)

---

## Quick Commands

```bash
# Test robots.txt
curl https://yourhotelapp.com/robots.txt

# Test sitemap
curl https://yourhotelapp.com/sitemap.xml

# Build locally
npm run build
npm run start

# Deploy
vercel --prod

# Check Google knows your site
site:yourhotelapp.com
```

---

## That's It!

**Time:**

- Setup: 15 min
- Metadata: 30 min
- Schema: 20 min
- Deploy: 30 min
- **Total: 95 minutes (< 2 hours)**

**SEO Improvement: 60-80% baseline**

**What still matters:**

1. Website speed (use Lighthouse tool)
2. Mobile responsive (test on phone)
3. Content quality (real hotel info)
4. Backlinks (harder, outside this guide)

---

## Resources

- [Google Search Console](https://search.google.com/search-console)
- [Schema Validator](https://validator.schema.org/)
- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Speed Test](https://pagespeed.web.dev/)

Done! ✅
