import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { posts } from "@/config/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/blog", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));
  const services = siteConfig.services.map((s) => ({
    url: `${siteConfig.url}/services/${s.slug}`,
    lastModified: new Date(),
  }));
  const articles = posts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00Z`),
  }));
  return [...pages, ...services, ...articles];
}
