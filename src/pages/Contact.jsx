export default function Contact() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
      <h1 className="text-4xl font-bold tracking-tight">
        Contact <span className="text-indigo-600">HopLink</span>
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        Have questions, feedback, or ideas for HopLink? We'd love to hear from you!
      </p>

      <p className="mt-2 text-gray-500">
        Email us anytime:
      </p>

      <a
        href="mailto:hotlinkcarpooling@gmail.com"
        className="mt-3 rounded-xl border px-6 py-2.5 text-indigo-600 border-indigo-300 hover:bg-indigo-50 transition font-medium"
      >
        hotlinkcarpooling@gmail.com
    
      </a>

      <p className="mt-6 text-sm text-gray-400">
        (Demo contact — no real inbox yet!)
      </p>
    </section>
  );
}
