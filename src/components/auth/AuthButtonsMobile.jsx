import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AuthButtonsMobile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          aria-label="Login"
          className="p-2 rounded-lg border text-gray-700 hover:bg-gray-100"
          title="Login"
        >
          <LogIn className="h-5 w-5" />
        </Link>
        <Link
          to="/register"
          aria-label="Register"
          className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          title="Register"
        >
          <UserPlus className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Logout"
        title="Logout"
        onClick={() => {
          logout();
          navigate("/", { replace: true });
        }}
        className="p-2 rounded-lg border text-gray-700 hover:bg-gray-100"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </div>
  );
}
