import "./globals.css";
import { Inter, Cherry_Bomb_One } from "next/font/google";
import { Metadata, Viewport } from "next";
import { ClientProviders } from "./ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const cherryBombOne = Cherry_Bomb_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cherry-bomb",
  display: "swap",
  preload: false
});
const baseURL = process.env.NEXT_PUBLIC_APP_URL || "https://apachepms.io.vn";
const ogImageUrl = `${baseURL}/full-shot-man-carrying-baggage.jpg`;

export const metadata: Metadata = {
  title: {
    default: "ApachePMS | Quản lý khách sạn và đặt phòng hiệu quả",
    template: "%s | ApachePMS"
  },
  description:
    "ApachePMS giúp chủ khách sạn quản lý phòng, đặt chỗ, khách lưu trú và thanh toán trên một nền tảng tập trung, tăng hiệu suất vận hành mỗi ngày.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "ApachePMS | Quản lý khách sạn và đặt phòng hiệu quả",
    description:
      "ApachePMS giúp chủ khách sạn quản lý phòng, đặt chỗ, khách lưu trú và thanh toán trên một nền tảng tập trung, tăng hiệu suất vận hành mỗi ngày.",
    url: baseURL,
    siteName: "ApachePMS",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "ApachePMS"
      }
    ],
    locale: "vi_VN",
    type: "website",
    countryName: "Vietnam"
  },
  twitter: {
    card: "summary_large_image",
    title: "ApachePMS | Quản lý khách sạn và đặt phòng hiệu quả",
    description:
      "ApachePMS giúp chủ khách sạn quản lý phòng, đặt chỗ, khách lưu trú và thanh toán trên một nền tảng tập trung, tăng hiệu suất vận hành mỗi ngày.",
    images: [ogImageUrl]
  },
  alternates: {
    canonical: baseURL
  },
  metadataBase: new URL(baseURL)
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cherryBombOne.variable}`}>
      <body className="min-h-screen" suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
