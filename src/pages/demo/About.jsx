export default function About() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight hl-heading">
        About <span className="text-indigo-600">HopLink</span>
      </h1>

      <p className="mt-4 text-lg hl-body max-w-2xl">
        HopLink is a simple, friendly carpooling platform designed to help people
        share rides, reduce travel costs, and build community along the way.
        We&apos;re focused on safety, simplicity, and real-world convenience.
        Making carpooling easier for everyday commuters and weekend travelers alike.
      </p>

      <p className="mt-4 hl-muted max-w-xl">
        We&apos;re currently building the platform and can&apos;t wait to share more soon.
      </p>
    </section>
  );
}
