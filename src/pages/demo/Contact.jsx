export default function Contact() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight hl-heading">
        Contact <span className="text-indigo-600">HopLink</span>
      </h1>

      <p className="mt-4 text-lg hl-body max-w-xl">
        Have questions, feedback, or ideas for HopLink? We&apos;d love to hear from you!
      </p>

      <p className="mt-2 hl-muted">
        Email us anytime:
      </p>

      <a
        href="mailto:hello@hoplink.app"
        className="mt-3 rounded-xl border px-6 py-2.5 font-medium
                   text-indigo-600 border-indigo-300 hover:bg-indigo-50 transition
                   dark:border-indigo-500/70 dark:text-indigo-200 dark:hover:bg-slate-900"
      >
        hello@hoplink.app
      </a>

      <p className="mt-6 text-sm hl-muted">
        (Demo contact - no real inbox yet!)
      </p>
    </section>
  );
}
