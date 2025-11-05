export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[70vh]">
      <h1 className="text-5xl font-bold tracking-tight">
        Welcome to <span className="text-indigo-600">HopLink</span>
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        A simple way to share rides, save money, and connect with fellow travelers.
        Carpooling made friendly and effortless.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="rounded-xl bg-indigo-600 px-6 py-2.5 text-white font-medium shadow hover:bg-indigo-700 transition">
          Coming Soon
        </button>

        <button className="rounded-xl border px-6 py-2.5 text-gray-700 hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>
    </section>
  );
}
