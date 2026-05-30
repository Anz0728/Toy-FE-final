import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Analyze.css"

function Analyze() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="phone-frame analyze-page">
      <div className="top-bar white">
        <span className="top-time">9:41</span>

        <div className="top-icons">
          <span>●●●</span>
          <span>⌁</span>
          <span className="battery"></span>
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate("/home")}>
        <ChevronLeft size={24} />
      </button>

      <div className="analyze-content">
        <h1>
          Ai가 <span>분석</span>하고 있어요
        </h1>

        <p className="analyze-subtitle">
          상품명, 카테고리, 예상 가격을 분석중이에요...
        </p>

        <div className="profile-circle">
          <div className="profile-inner">👤</div>
        </div>

        <div className="analyze-text">
          <p>잠시만 기다려 주세요!</p>
          <p>정확한 분석을 위해</p>
          <p>이미지를 꼼꼼히 확인하고 있어요</p>
        </div>
      </div>

      <div className="radar-bg">
        <div className="ring ring1"></div>
        <div className="ring ring2"></div>
        <div className="ring ring3"></div>
        <div className="ring ring4"></div>
      </div>

      <div className="home-indicator light" />
    </div>
  );
}

export default Analyze;
