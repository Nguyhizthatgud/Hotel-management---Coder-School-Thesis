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
const baseURL = process.env.NEXT_PUBLIC_APP_URL;

export const metadata: Metadata = {
  title: {
    default: "ApachePMS | Nền tảng hỗ trợ quản lý và quảng bá khách sạn và dịch vụ cho thuê",
    template: "%s | ApachePMS"
  },
  description:
    "ApachePMS là nền tảng hỗ trợ quản lý và quảng bá khách sạn và dịch vụ cho thuê, giúp chủ khách sạn tối ưu hóa hoạt động kinh doanh và tăng cường trải nghiệm khách hàng.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "ApachePMS | Nền tảng hỗ trợ quản lý và quảng bá khách sạn và dịch vụ cho thuê",
    description:
      "ApachePMS là nền tảng hỗ trợ quản lý và quảng bá khách sạn và dịch vụ cho thuê, giúp chủ khách sạn tối ưu hóa hoạt động akinh doanh và tăng cường trải nghiệm khách hàng.",
    url: `${baseURL}`,
    siteName: "ApachePMS",
    images: {
      url: "/full-shot-man-carrying-baggage.jpg",
      width: 1200,
      height: 630,
      alt: "ApachePMS"
    },
    locale: "vi_VN",
    type: "website",
    countryName: "Vietnam"
  },
  alternates: {
    canonical: `${baseURL}`
  },
  metadataBase: new URL(`${baseURL}`)
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
