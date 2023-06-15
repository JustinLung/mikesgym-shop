import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';


export default function About() {
  return (
    <>
      <section className="h-[30rem] w-full bg-red-200 relative">
        <div className="absolute flex justify-center items-center flex-col w-full h-full">
          <h1 className="text-3xl md:text-7xl font-semibold text-mg-yellow">
            ABOUT MIKE’S GYM
          </h1>
          <p className="text-lg md:text-2xl">
            PUSH YOUR LIMITS FORWARD. LEARN FROM THE LEGEND
          </p>
        </div>
        <img
          src="/images/mikesgymring2-scaled.jpeg"
          alt="Mikes Gym Ring"
          className="w-full h-full object-cover"
        />
      </section>
      <section className="flex flex-col md:flex-row justify-around items-center p-10 gap-4">
        <div>
          <h2 className="text-4xl pb-4 text-mg-yellow">PUSH YOUR LIMITS</h2>
          <p className="max-w-[30rem]">
            Mike Passenier has been a big boxing fan his whole life. His love
            for combat sport was developed at an early age. He started training
            a group of fighters in 2002 and a year later he openend his own gym.
            <br />
            Mike’s gym has over 1100 members and is one of the biggest combat
            clubs of Holland; it’s not only a gym for professional athletes but
            also one for champions. You don’t need to win fights or earn belts
            to name yourself a champion.
          </p>
        </div>
        <img
          src="/images/mike.webp"
          alt="Mike Passenier"
          className="w-full md:w-1/2"
        />
      </section>
      <figure className="bg-mg-yellow text-black px-10 py-10 font-light">
        <span className="text-8xl">"</span>
        <blockquote className="text-xl max-w-[45rem]" cite="Mike Passenier">
          I create champions! Most people will think of Badr Hari or Gokhan Saki
          when they hear the word champions but in my gym everyone is a winner.
          Everyone that is willing to work hard and achieve their personal goals
          get’s to be called a champion.
        </blockquote>
        <figcaption className="mt-10">Mike Passenier</figcaption>
      </figure>
      <section className="h-[20rem] flex justify-center items-center flex-col">
        <h2 className="text-3xl pb-4">SHOP OUR LATEST PRODUCTS</h2>
        <a href="/products" className="bg-mg-yellow text-black px-4 py-2 text-xl hover:bg-transparent hover:text-mg-yellow border border-mg-yellow transition-colors">products</a>
      </section>
    </>
  );
}