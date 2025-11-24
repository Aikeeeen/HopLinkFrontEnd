import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <p className="mt-3 hl-body">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block hl-btn-primary"
        >
          Go home
        </Link>
      </div>
    </section>
  );
}
