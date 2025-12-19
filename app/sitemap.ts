import { type MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [{ url: 'https://icons.lndev.me', lastModified: new Date() }];
}
