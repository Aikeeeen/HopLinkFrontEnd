import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";
  const [err, setErr] = useState("");

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-center">
          Sign in to <span className="text-indigo-600">HopLink</span>
        </h1>

        <form
          className="mt-6 grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await login({ email, password });
              navigate(redirectTo, { replace: true });
            } catch (e) {
              setErr(e.message || "Login failed");
            }
          }}
        >
          {err && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
              {err}
            </p>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border px-3 py-2 outline-none ring-indigo-200 focus:ring-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border px-3 py-2 outline-none ring-indigo-200 focus:ring-2"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
          >
            Sign in
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          New here?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
