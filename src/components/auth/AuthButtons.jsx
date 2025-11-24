import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthButtons() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link to="/demo/login" className="hl-btn-secondary">
          Login
        </Link>
        <Link to="/demo/register" className="hl-btn-primary">
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => {
          logout();
          navigate("/demo", { replace: true });
        }}
        className="hl-btn-secondary"
      >
        Logout
      </button>
    </div>
  );
}
