import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("passenger");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="hl-page flex min-h-[60vh] items-center justify-center px-4">
      <div className="hl-auth-card">
        <h1 className="text-center text-2xl font-bold tracking-tight hl-heading">
          Create your <span className="text-indigo-600">HopLink demo</span> account
        </h1>

        <p className="hl-auth-warning">
          <strong>Demo only:</strong> This version of HopLink runs entirely in your
          browser using a local demo database (browser SQLite). Passwords are{" "}
          <strong>not hashed</strong> and data is <strong>not stored securely</strong>.
          Please <strong>do not use a real email address or password</strong>.
        </p>

        <form
          className="mt-6 grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (password !== password2) {
              setErr("Passwords do not match");
              return;
            }
            try {
              setErr("");
              await register({ name, email, role, password });
              navigate("/demo");
            } catch (e) {
              setErr(e.message || "Registration failed");
            }
          }}
        >
          {err && <p className="hl-error">{err}</p>}

          <div className="flex gap-3 text-sm hl-body">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="passenger"
                checked={role === "passenger"}
                onChange={() => setRole("passenger")}
              />
              Passenger
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="driver"
                checked={role === "driver"}
                onChange={() => setRole("driver")}
              />
              Driver
            </label>
          </div>

          <div>
            <label className="hl-label">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Demo"
              className="hl-input"
            />
          </div>

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
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="hl-input-with-btn"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="hl-toggle-btn"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="hl-label">Confirm Password</label>
            <div className="relative">
              <input
                type={showPw2 ? "text" : "password"}
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="••••••••"
                className="hl-input-with-btn"
              />
              <button
                type="button"
                onClick={() => setShowPw2((v) => !v)}
                className="hl-toggle-btn"
              >
                {showPw2 ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="mt-2 hl-btn-primary">
            Create demo account
          </button>
        </form>

        <p className="hl-auth-footer">
          Already have a demo account?{" "}
          <Link to="/demo/login" className="hl-link-muted">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
