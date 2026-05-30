import svg1 from "../assets/1.svg";
import svg3 from "../assets/3.svg";
import svg4 from "../assets/4.svg";
import svg5 from "../assets/5.svg";
import svg6 from "../assets/6.svg";
import svg7 from "../assets/7.svg";
import svg8 from "../assets/8.svg";
import svg9 from "../assets/9.svg";
import svg11 from "../assets/11.svg";
import svg12 from "../assets/12.svg";
import svg13 from "../assets/13.svg";
import svg14 from "../assets/14.svg";
import svg15 from "../assets/15.svg";
import svg16 from "../assets/16.svg";
import svg17 from "../assets/17.svg";
import svg133 from "../assets/133.svg";
import { useNavigate } from "react-router-dom";
import './Home.css'

function Home() {
  const navigate = useNavigate();
  return (
    <div 
    className="phone-frame"
    onClick={() => navigate("/analyze")}>
      <div className="top-bar">
        <span className="top-time">9:41</span>

        <div className="top-icons">
          <span>●●●</span>
          <span>⌁</span>
          <span className="battery"></span>
        </div>
      </div>

      <div className="second-page">
        {/* 배경 원들 */}
        <img className="svg1" src={svg1} alt="circle dashed" />
        <img className="svg3" src={svg3} alt="circle pink" />
        <img className="svg4" src={svg4} alt="circle white" />

        {/* 중앙 원 */}
        <img className="svg5" src={svg5} alt="" />

        {/* 주변 요소 */}
        <img className="svg6" src={svg6} alt="" />
        <img className="svg7" src={svg7} alt="" />
        <img className="svg8" src={svg8} alt="" />
        <img className="svg9" src={svg9} alt="" />
        <img className="svg11" src={svg11} alt="" />
        <img className="svg12" src={svg12} alt="" />
        <img className="svg13" src={svg13} alt="" />
        <img className="svg133" src={svg133} alt="" />
        <img className="svg14" src={svg14} alt="" />
        <img className="svg15" src={svg15} alt="" />
        <img className="svg16" src={svg16} alt="" />

        {/* 하단 문구 */}
        <img className="svg17" src={svg17} alt="오늘의 소비를 사진으로 기록해보세요" />
      </div>

      <div className="home-indicator light" />
    </div>
  );
}

export default Home;