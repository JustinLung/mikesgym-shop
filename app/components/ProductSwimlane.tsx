import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {Link, ProductCard, Section} from '~/components';

const mockProducts = new Array(12).fill('');

export function ProductSwimlane({
  title = 'Featured Products',
  type = 'T-SHIRTS',
  href = '/',
  products = mockProducts,
  count = 12,
  ...props
}: {
  title?: string;
  products?: Product[];
  href?: string;
  type?: string;
  count?: number;
}) {
  return (
    <section>
      <header className="px-[1.5rem] md:px-8 lg:px-12 my-4 uppercase flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[#767676]">{title}</span>
          <h2 className="text-mg-yellow text-2xl">{type}</h2>
        </div>
        <Link to={href}>VIEW ALL</Link>
      </header>
      <div className="swimlane hiddenScroll md:pb-8 md:scroll-px-8 lg:scroll-px-12 md:px-8 lg:px-12">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            className="snap-start w-80"
          />
        ))}
      </div>
    </section>
  );
}
