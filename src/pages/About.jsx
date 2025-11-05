export default function About() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
      <h1 className="text-4xl font-bold tracking-tight">
        About <span className="text-indigo-600">HopLink</span>
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        HopLink is a simple, friendly carpooling platform designed to help people
        share rides, reduce travel costs, and build community along the way.
        We're focused on safety, simplicity, and real-world convenience — making
        carpooling easier for everyday commuters and weekend travelers alike.
      </p>

      <p className="mt-4 text-gray-500 max-w-xl">
        We're currently building the platform and can't wait to share more soon.
      </p>
    </section>
  );
}
