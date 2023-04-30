import {type EnhancedMenu, useIsHomePath} from '~/lib/utils';
import {
  Drawer,
  useDrawer,
  IconBag,
  IconMenu,
  Cart,
  CartLoading,
  Link,
  IconAccount,
  IconLogin,
} from '~/components';
import {useParams, Await, useMatches} from '@remix-run/react';
import {Suspense, useEffect, useMemo} from 'react';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import type {LayoutData} from '../root';

export function Layout({
  children,
  layout,
}: {
  children: React.ReactNode;
  layout: LayoutData;
}) {
  return (
    <>
      <Header menu={layout?.headerMenu} />
      <main role="main" id="mainContent" className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="flex justify-between px-4 md:px-8 py-4 md:py-8 border-t-mg-yellow border-transparent border-2">
      <div>
        &copy; {new Date().getFullYear()}{' '}
        <a href="https://mikesgym.com/" target="_blank" rel="noreferrer">
          Mike's Gym
        </a>
      </div>
      <div className="flex gap-4">
        <img src="/icons/ideal.png" alt="Ideal" />
        <img src="/icons/visa.png" alt="Visa" />
        <img src="/icons/mastercard.png" alt="MasterCard" />
      </div>
    </footer>
  );
}

function Header({menu}: {menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader isHome={isHome} menu={menu} openCart={openCart} />
      <MobileHeader isHome={isHome} openCart={openCart} openMenu={openMenu} />
    </>
  );
}

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const [root] = useMatches();

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={root.data?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({onClose}: {onClose: () => void}) {
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 md:px-12">
      <Link to="/" onClick={onClose}>
        Home
      </Link>
      <Link to="/products" onClick={onClose}>
        Products
      </Link>
      <Link to="/about" onClick={onClose}>
        About
      </Link>
      <Link to="/contact" onClick={onClose}>
        Contact
      </Link>
      <Link
        to="https://mikesgym.com/memberships/"
        target="_blank"
        rel="noreferrer noopener"
        className="bg-mg-yellow text-black py-2 px-4 border-2 border-mg-yellow hover:bg-transparent transition-colors hover:text-mg-yellow w-fit"
      >
        BECOME A MEMBER
      </Link>
    </nav>
  );
}

function AccountLink({className}: {className?: string}) {
  const [root] = useMatches();
  const isLoggedIn = root.data?.isLoggedIn;
  return isLoggedIn ? (
    <Link to="/account" className={className}>
      <IconAccount />
    </Link>
  ) : (
    <Link to="/account/login" className={className}>
      <IconLogin />
    </Link>
  );
}

function MobileHeader({
  isHome,
  openCart,
  openMenu,
}: {
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
}) {
  return (
    <header
      role="banner"
      className="flex bg-black text-white lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8"
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
      </div>
      <Link className="font-bold" to="/" prefetch="intent">
        <img
          src="/images/logo-mikesgym.png"
          alt="Mike's Gym Logo"
          className="w-25"
        />
      </Link>
      <div className="flex items-center justify-end w-full gap-4">
        <AccountLink className="relative flex items-center justify-center w-8 h-8" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function DesktopHeader({
  isHome,
  openCart,
}: {
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
}) {
  return (
    <header
      role="banner"
      className="hidden bg-black text-white h-nav lg:flex items-center sticky transition duration-300 z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8"
    >
      <Link className="font-bold" to="/" prefetch="intent">
        <img
          src="/images/logo-mikesgym.png"
          alt="Mike's Gym Logo"
          className="w-20"
        />
      </Link>
      <nav className="flex gap-8 ml-auto">
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="flex justify-center items-center gap-4 ml-auto">
        <Link
          to="https://mikesgym.com/memberships/"
          target="_blank"
          rel="noreferrer noopener"
          className="bg-mg-yellow text-black py-2 px-4 border-2 border-mg-yellow hover:bg-transparent transition-colors hover:text-mg-yellow"
        >
          BECOME A MEMBER
        </Link>
        <CartCount isHome={isHome} openCart={openCart} />
        <AccountLink className="relative flex items-center justify-center w-8 h-8" />
      </div>
    </header>
  );
}

function CartCount({
  isHome,
  openCart,
}: {
  isHome: boolean;
  openCart: () => void;
}) {
  const [root] = useMatches();

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  dark,
  count,
}: {
  count: number;
  dark: boolean;
  openCart: () => void;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div className="absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px">
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}
