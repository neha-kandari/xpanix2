import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '',
    },
    sitemap: 'https://www.xpanix.com/sitemap.xml',
    host: 'https://www.xpanix.com',
  }
}
