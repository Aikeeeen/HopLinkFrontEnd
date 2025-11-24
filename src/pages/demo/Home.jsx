export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4">
      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight hl-heading">
        Welcome to <span className="text-indigo-600">HopLink</span>
      </h1>

      <p className="mt-4 text-lg hl-body max-w-xl">
        A simple way to share rides, save money, and connect with fellow travelers.
        Carpooling made friendly and effortless.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <button className="hl-btn-primary shadow">
          Coming Soon
        </button>

        <button className="hl-btn-secondary">
          Learn More
        </button>
      </div>
    </section>
  );
}
