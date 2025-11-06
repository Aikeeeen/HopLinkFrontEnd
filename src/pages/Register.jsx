import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("passenger"); // driver | passenger
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-center">
          Create your <span className="text-indigo-600">HopLink</span> account
        </h1>

        <form
          className="mt-6 grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (password !== password2) {
              setErr("Passwords do not match");
              return;
            }
            try {
              await register({ name, email, role, password });
              navigate("/");
            } catch (e) {
              setErr(e.message || "Registration failed");
            }
          }}
        >
          {err && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{err}</p>}

          {/* Role */}
          <div className="flex gap-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="passenger" checked={role === "passenger"} onChange={() => setRole("passenger")} />
              Passenger
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="driver" checked={role === "driver"} onChange={() => setRole("driver")} />
              Driver
            </label>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe" className="w-full rounded-xl border px-3 py-2 outline-none ring-indigo-200 focus:ring-2" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" className="w-full rounded-xl border px-3 py-2 outline-none ring-indigo-200 focus:ring-2" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" className="w-full rounded-xl border px-3 py-2 pr-24 outline-none ring-indigo-200 focus:ring-2" />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                className="absolute right-1 top-1.5 rounded-lg px-3 py-1 text-sm text-gray-600 hover:bg-gray-100">
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input type={showPw2 ? "text" : "password"} required value={password2} onChange={(e) => setPassword2(e.target.value)}
                placeholder="••••••••" className="w-full rounded-xl border px-3 py-2 pr-24 outline-none ring-indigo-200 focus:ring-2" />
              <button type="button" onClick={() => setShowPw2((v) => !v)}
                className="absolute right-1 top-1.5 rounded-lg px-3 py-1 text-sm text-gray-600 hover:bg-gray-100">
                {showPw2 ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="mt-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700">
            Create account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
