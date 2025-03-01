
import { AVN } from "@/types/avn";

export function generateMetaTags(props: {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
}) {
  const { title, description, image, url, type = 'website' } = props;
  
  return {
    title: `${title} - AVN Directory`,
    meta: [
      {
        name: 'description',
        content: description,
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:type',
        content: type,
      },
      {
        property: 'og:url',
        content: url,
      },
      {
        property: 'og:image',
        content: image || '/og-image.png',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: title,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:image',
        content: image || '/og-image.png',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
  };
}

export function generateSchemaData(avn: AVN) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: avn.title,
    description: avn.description,
    applicationCategory: 'Game',
    operatingSystem: avn.platforms?.join(', '),
    offers: {
      '@type': 'Offer',
      price: avn.price === 'free' ? '0' : 'varies',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: avn.developer,
    },
    genre: avn.genre.join(', '),
    ...(avn.image && { image: avn.image }),
  };
}
