import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <p className="mt-3 text-gray-600">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-700">
          Go home
        </Link>
      </div>
    </section>
  );
}
