import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://globalsellershop.com",
      lastModified: new Date(),
    },

    {
      url: "https://globalsellershop.com/wholesale",
      lastModified: new Date(),
    },

    {
      url: "https://globalsellershop.com/sales-channel",
      lastModified: new Date(),
    },

    {
      url: "https://globalsellershop.com/blog",
      lastModified: new Date(),
    },

    {
      url: "https://globalsellershop.com/board",
      lastModified: new Date(),
    },

    {
      url: "https://globalsellershop.com/sellertool",
      lastModified: new Date(),
    },
  ];
}