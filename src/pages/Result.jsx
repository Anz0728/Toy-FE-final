import { useState } from "react";
import { ChevronLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/background.jpeg";

function Result() {
  const navigate = useNavigate();

  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [sheetY, setSheetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startSheetY, setStartSheetY] = useState(0);

  const emotions = [
    "🌿 잘 샀다",
    "🏝️ 기분전환",
    "😈 스트레스",
    "😊 보상심리",
    "💪 충동구매",
    "🎁 관계/선물",
  ];

  const toggleEmotion = (emotion) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter((item) => item !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleDragStart = (clientY) => {
    setIsDragging(true);
    setStartY(clientY);
    setStartSheetY(sheetY);
  };

  const handleDragMove = (clientY) => {
    if (!isDragging) return;

    const diff = clientY - startY;
    const nextY = startSheetY + diff;

    if (nextY <= 0 && nextY >= -360) {
      setSheetY(nextY);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (sheetY < -180) {
      setSheetY(-360);
    } else {
      setSheetY(0);
    }
  };

  return (
    <div
      className="phone-frame result-page"
      onMouseMove={(e) => handleDragMove(e.clientY)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
      onTouchEnd={handleDragEnd}
    >
      <div
        className="result-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="result-overlay"></div>

      <div className="top-bar result-top">
        <span className="top-time">9:41</span>

        <div className="top-icons">
          <span>●●●</span>
          <span>⌁</span>
          <span className="battery"></span>
        </div>
      </div>

      <button className="result-back" onClick={() => navigate("/home")}>
        <ChevronLeft size={24} />
      </button>

      <div className="location-pill">
        <MapPin size={16} />
        부천시 역곡동
      </div>

      <div className="result-info">
        <input className="product-input" placeholder="상품명 입력" />
        <input className="category-input" placeholder="카테고리 입력" />

        <div className="price-box">
          <div className="percent-circle">80%</div>
          <input className="price-input" defaultValue="금액 18,000원" />
        </div>
      </div>

      <div
        className="bottom-sheet"
        style={{
          transform: `translateY(${sheetY}px)`,
          transition: isDragging ? "none" : "transform 0.25s ease",
        }}
      >
        <div
          className="sheet-handle"
          onMouseDown={(e) => handleDragStart(e.clientY)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
        ></div>

        <div className="bottom-sheet-content">
          <label className="sheet-label">한 줄 다이어리</label>

          <textarea
            className="diary-input"
            defaultValue={`피부가 많이 건조했는데
필요했던 제품이라 만족! 😍`}
          />

          <p className="emotion-title">오늘의 감정은?</p>

          <div className="emotion-buttons">
            {emotions.map((emotion) => (
              <button
                key={emotion}
                type="button"
                className={
                  selectedEmotions.includes(emotion)
                    ? "emotion-button selected"
                    : "emotion-button"
                }
                onClick={() => toggleEmotion(emotion)}
              >
                {emotion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;