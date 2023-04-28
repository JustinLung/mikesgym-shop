import clsx from 'clsx';
import type {SerializeFrom} from '@shopify/remix-oxygen';
import {MediaFile} from '@shopify/hydrogen';
import type {
  MediaImage,
  Media,
  Metafield,
  Video as MediaVideo,
} from '@shopify/hydrogen/storefront-api-types';
import {Link} from './Link';

export interface CollectionHero {
  byline: Metafield;
  cta: Metafield;
  handle: string;
  heading: Metafield;
  height?: 'full';
  loading?: 'eager' | 'lazy';
  spread: Metafield;
  spreadSecondary: Metafield;
  top?: boolean;
}

/**
 * Hero component that renders metafields attached to collection resources
 **/
export function Hero() {
  return (
    <section className="relative h-[30rem] md:h-[40rem]">
      <div className="absolute h-full w-full flex flex-col justify-center pl-4 md:pl-12  z-10">
        <h1 className="text-2xl md:text-5xl">
          BECOME THE BEST <br /> VERSION OF YOURSELF
        </h1>
        <p className="text-lg md:text-xl font-light pt-2">
          The worlds leading kickboxing gym
        </p>
        <div className="mt-2 flex gap-3">
          <Link
            to="/products"
            className="bg-mg-yellow text-black w-fit px-4 py-1 border-2 border-mg-yellow hover:bg-transparent transition-colors hover:text-mg-yellow"
          >
            GEAR UP
          </Link>
          <Link
            to="/about"
            className="bg-transparent text-white border-2 border-solid border-white w-fit px-4 py-1 hover:bg-white hover:text-black transition-colors"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
      <div className="h-full w-full bg-black opacity-30 absolute" />
      <video
        preload="auto"
        loop
        autoPlay={true}
        muted
        className="w-full h-full object-cover"
      >
        <source src="/images/30mbMikes-webvideo-video-small.mp4" />
      </video>
    </section>
  );
}

interface SpreadMediaProps {
  data: Media | MediaImage | MediaVideo;
  loading?: HTMLImageElement['loading'];
  sizes: string;
}

function SpreadMedia({data, loading, sizes}: SpreadMediaProps) {
  return (
    <MediaFile
      data={data}
      className="block object-cover w-full h-full"
      mediaOptions={{
        video: {
          controls: false,
          muted: true,
          loop: true,
          playsInline: true,
          autoPlay: true,
          previewImageOptions: {src: data.previewImage?.url ?? ''},
        },
        image: {
          loading,
          crop: 'center',
          sizes,
          alt: data.alt || '',
        },
      }}
    />
  );
}
