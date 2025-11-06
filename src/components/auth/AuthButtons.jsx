import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthButtons() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link to="/login" className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100">Login</Link>
        <Link to="/register" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">Register</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => { logout(); navigate("/", { replace: true }); }}
        className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
}
