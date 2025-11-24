import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [err, setErr] = useState("");

  const from = location.state?.from?.pathname;
  const redirectTo =
    typeof from === "string" && from.startsWith("/demo") ? from : "/demo";

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="hl-auth-card">
        <h1 className="text-2xl font-bold tracking-tight text-center hl-heading">
          Sign in to <span className="text-indigo-600">HopLink demo</span>
        </h1>

        <p className="hl-auth-warning">
          <strong>Demo only:</strong> This demo runs entirely in your browser
          using a local SQLite database. Passwords are{" "}
          <strong>not hashed</strong> and data is{" "}
          <strong>not stored securely</strong>. Please{" "}
          <strong>do not use real credentials</strong>.
        </p>

        <form
          className="mt-6 grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setErr("");
              await login({ email, password });
              navigate(redirectTo, { replace: true });
            } catch (e) {
              setErr(e.message || "Login failed");
            }
          }}
        >
          {err && <p className="hl-error">{err}</p>}

          <div>
            <label className="hl-label">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@hoplink.test"
              className="hl-input"
            />
          </div>

          <div>
            <label className="hl-label">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="hl-input"
            />
          </div>

          <button type="submit" className="mt-2 hl-btn-primary">
            Sign in
          </button>
        </form>

        <p className="hl-auth-footer">
          New here?{" "}
          <Link to="/demo/register" className="hl-link-muted">
            Create a demo account
          </Link>
        </p>
      </div>
    </section>
  );
}
