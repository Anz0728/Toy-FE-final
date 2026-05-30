import './Diary.css'
import { useState } from "react";
import { Link } from "react-router-dom";

function Diary() {
  const spendings = JSON.parse(localStorage.getItem("spendings") || "[]");

  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [sheetY, setSheetY] = useState(0);
  const [startY, setStartY] = useState(null);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (startY === null) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (diff > -260 && diff < 260) {
      setSheetY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (sheetY < -80) {
      setSheetY(-240);
    } else if (sheetY > 80) {
      setSheetY(220);
    } else {
      setSheetY(0);
    }

    setStartY(null);
  };

  const latestItem = spendings[spendings.length - 1];

  const emotionButtonStyle = (emotion) => ({
    padding: "10px 16px",
    borderRadius: "999px",
    border:
      selectedEmotion === emotion
        ? "2px solid #4b164c"
        : "1px solid #e0c8df",
    backgroundColor: selectedEmotion === emotion ? "#4b164c" : "#ffffff",
    color: selectedEmotion === emotion ? "#ffffff" : "#4b164c",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.25s ease",
    transform: selectedEmotion === emotion ? "scale(1.04)" : "scale(1)",
    boxShadow:
      selectedEmotion === emotion
        ? "0 6px 16px rgba(75, 22, 76, 0.3)"
        : "none",
  });

  return (
    <div className="app-screen diary-screen">
      <Link className="diary-back" to="/home">
        ‹
      </Link>

      <div className="diary-location">📍 부천시 역곡동</div>

      <div className="diary-hero">
        <h1>{latestItem?.itemName || "상품명 입력"}</h1>
        <p>{latestItem?.category || "카테고리 입력"}</p>

        <div className="diary-price-box">
          <span>80%</span>
          <strong>금액 {latestItem?.price || "18,000"}원</strong>
        </div>
      </div>

      <div
        className="diary-bottom-sheet"
        style={{ transform: `translateY(${sheetY}px)` }}
      >
        <div
          className="diary-sheet-handle"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        <p className="diary-label">한 줄 다이어리</p>

        {spendings.length === 0 ? (
          <p className="diary-empty">아직 작성된 소비 기록이 없어요.</p>
        ) : (
          spendings.map((item) => (
            <div className="diary-card" key={item.id}>
              <h3>
                {item.emoji} {item.itemName}
              </h3>
              <p>{item.memo || "아직 메모가 없어요."}</p>
            </div>
          ))
        )}

        <p className="emotion-title">오늘의 감정은?</p>

        <div
          className="emotion-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <button
            type="button"
            style={emotionButtonStyle("잘샀다")}
            onClick={() => setSelectedEmotion("잘샀다")}
          >
            🌿 잘 샀다
          </button>

          <button
            type="button"
            style={emotionButtonStyle("기분전환")}
            onClick={() => setSelectedEmotion("기분전환")}
          >
            🏝️ 기분전환
          </button>

          <button
            type="button"
            style={emotionButtonStyle("스트레스")}
            onClick={() => setSelectedEmotion("스트레스")}
          >
            😈 스트레스
          </button>

          <button
            type="button"
            style={emotionButtonStyle("보상심리")}
            onClick={() => setSelectedEmotion("보상심리")}
          >
            😊 보상심리
          </button>
        </div>
      </div>
    </div>
  );
}

export default Diary;