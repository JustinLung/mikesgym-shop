export default function About() {
  return (
    <>
      <section className="h-[30rem] w-full bg-red-200 relative">
        <div className="absolute flex justify-center items-center flex-col w-full h-full">
          <h1 className="text-7xl font-semibold text-mg-yellow">
            ABOUT MIKE’S GYM
          </h1>
          <p className="text-2xl">
            PUSH YOUR LIMITS FORWARD. LEARN FROM THE LEGEND
          </p>
        </div>
        <img
          src="/images/mikesgymring2-scaled.jpeg"
          alt="Mikes Gym Ring"
          className="w-full h-full object-cover"
        />
        <div className="h-full w-full bg-black opacity-30 absolute z-10" />
      </section>
    </>
  );
}
