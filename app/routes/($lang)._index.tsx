import {defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, Link, useLoaderData} from '@remix-run/react';
import {
  ProductSwimlane,
  FeaturedCollections,
  Hero,
  ProductCard,
} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {seoPayload} from '~/lib/seo.server';
import type {
  CollectionConnection,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';
import {AnalyticsPageType} from '@shopify/hydrogen';
import {routeHeaders, CACHE_SHORT} from '~/data/cache';
import Marque from '~/components/Marque';

interface HomeSeoData {
  shop: {
    name: string;
    description: string;
  };
}

export const headers = routeHeaders;

export async function loader({params, context}: LoaderArgs) {
  const {language, country} = context.storefront.i18n;

  if (
    params.lang &&
    params.lang.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the lang URL param is defined, yet we still are on `EN-US`
    // the the lang param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const {shop} = await context.storefront.query<{
    shop: HomeSeoData;
  }>(HOMEPAGE_SEO_QUERY, {
    variables: {handle: 'freestyle'},
  });

  const seo = seoPayload.home();

  return defer(
    {
      shop,
      featuredCollections: context.storefront.query<{
        collections: CollectionConnection;
      }>(FEATURED_COLLECTIONS_QUERY, {
        variables: {
          country,
          language,
        },
      }),
      analytics: {
        pageType: AnalyticsPageType.home,
      },
      seo,
    },
    {
      headers: {
        'Cache-Control': CACHE_SHORT,
      },
    },
  );
}

export default function Homepage() {
  const {featuredCollections} = useLoaderData<typeof loader>();
  return (
    <>
      <Hero />
      <Marque />

      {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({collections}) => {
              if (!collections?.nodes) return <></>;
              return (
                <>
                  <ProductSwimlane
                    products={collections.nodes[2].products.nodes}
                    title={collections.nodes[2].title}
                    count={4}
                    type="Accessories"
                    href={`/collections/gloves`}
                  />
                </>
              );
            }}
          </Await>
        </Suspense>
      )}

      <section className="relative h-[30rem] md:h-[35rem]">
        <div className="absolute h-full w-full flex flex-col justify-center pl-4 md:pl-12  z-10">
          <h1 className="text-2xl md:text-5xl">
            YOU’VE PUT IN THE WORK. <br /> NOW SHOW OFF THE RESULTS.
          </h1>
          <p className="text-lg md:text-xl font-light pt-2 max-w-md">
            Flex what you’ve built with physique-enhancing cuts,compressive fits
            and comfortable lifting essentials.
          </p>
          <div className="mt-2 flex gap-3">
            <Link
              to="/collections/men"
              className="bg-mg-yellow text-black w-fit px-4 py-1 border-2 border-mg-yellow hover:bg-transparent transition-colors hover:text-mg-yellow"
            >
              SHOP MEN
            </Link>
            <Link
              to="/collections/women"
              className="bg-transparent text-white border-2 border-solid border-white w-fit px-4 py-1 hover:bg-white hover:text-black transition-colors"
            >
              SHOP WOMEN
            </Link>
          </div>
        </div>
        <div className="h-full w-full bg-black opacity-50 absolute" />
        <img
          src="/images/shop.png"
          alt="shop"
          className="w-full h-full object-cover"
        />
      </section>

      {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({collections}) => {
              if (!collections?.nodes) return <></>;
              return (
                <>
                  <ProductSwimlane
                    products={collections.nodes[0].products.nodes}
                    title={collections.nodes[0].title}
                    count={4}
                    type="clothing"
                    href={`/collections/men`}
                    prefetch="intent"
                  />
                </>
              );
            }}
          </Await>
        </Suspense>
      )}
    </>
  );
}

// @see: https://shopify.dev/api/storefront/2023-04/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query featuredCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        products(first: 8) {
          nodes {
            ...ProductCard
            productType
            handle
          }
        }
      }
    }
  }
`;

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  ${MEDIA_FRAGMENT}
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
`;

const HOMEPAGE_SEO_QUERY = `#graphql
  ${COLLECTION_CONTENT_FRAGMENT}
  query collectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
`;
