import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";

function Buylog() {
  const navigate = useNavigate();

  return (
    <div className="phone-frame">
      <div className="top-bar">
        <span className="top-time">9:41</span>
        <div className="top-icons">
          <span>●●●</span>
          <span>⌁</span>
          <span className="battery"></span>
        </div>
      </div>

      <div className="login-page">
        <h1 className="logo">Buylog</h1>

        <div className="login-buttons">
          <p className="button-title">Buttons</p>

          <button className="login-btn primary" onClick={() => navigate("/home")}>
            <span className="icon-circle">
              <Phone size={20} />
            </span>
            Login with Phone
          </button>

          <button className="login-btn secondary" onClick={() => navigate("/home")}>
            <span className="google-icon">G</span>
            Login with Google
          </button>

          <p className="signup">
            Don&apos;t have an account? <span onClick={() => navigate("/home")}>Sign Up</span>
          </p>
        </div>
      </div>

      <div className="home-indicator" />
    </div>
  );
}

export default Buylog;