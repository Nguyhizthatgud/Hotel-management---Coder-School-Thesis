import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://apache-hotels.com";

  // In a real app, fetch your room IDs from your service
  // const rooms = await getRooms();
  // const roomUrls = rooms.map(room => ({ url: `${baseUrl}/rooms/${room.id}`, lastModified: new Date() }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
}
