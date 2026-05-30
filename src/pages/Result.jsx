import './Result.css'
import { useState, useEffect } from "react";
import { ChevronLeft, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { api, BASE_URL } from "../utils/api";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, imageUrl } = location.state || {};

  // Form states
  const [itemName, setItemName] = useState(result?.itemName || "");
  const [category, setCategory] = useState(result?.category || "");
  const [amount, setAmount] = useState(result?.amount || 0);
  const [purchaseDate, setPurchaseDate] = useState(result?.purchaseDate || new Date().toISOString().split('T')[0]);
  const [emotionTag, setEmotionTag] = useState(result?.recommendedEmotion || "");
  const [satisfactionLevel, setSatisfactionLevel] = useState("잘 샀다");
  const [memo, setMemo] = useState("");

  // UI states
  const [sheetY, setSheetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startSheetY, setStartSheetY] = useState(0);

  const emotions = [
    { label: "🌿 잘 샀다", value: "잘 샀다" },
    { label: "🏝️ 기분전환", value: "기분전환" },
    { label: "😈 스트레스", value: "스트레스" },
    { label: "😊 보상심리", value: "보상심리" },
    { label: "💪 충동구매", value: "충동구매" },
    { label: "🎁 관계/선물", value: "관계/선물" },
    { label: "😢 왜 샀지", value: "왜 샀지" },
    { label: "📦 필요해서", value: "필요해서" },
  ];

  const satisfactions = ["잘 샀다", "애매하다", "왜 샀지"];

  const handleSave = async () => {
    try {
      const spendingData = {
        imageUrl,
        itemName,
        category,
        amount: Number(amount),
        purchaseDate,
        emotionTag,
        satisfactionLevel,
        memo,
        aiConfidence: result?.aiConfidence || 0
      };

      await api.saveSpending(spendingData);
      alert("소비 기록이 저장되었습니다!");
      navigate("/home");
    } catch (e) {
      alert(e.message || "저장에 실패했습니다.");
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

  if (!result) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`;

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
        style={{ backgroundImage: `url(${fullImageUrl})` }}
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

      <button className="result-back" onClick={() => navigate("/buylog")}>
        <ChevronLeft size={24} />
      </button>

      <div className="location-pill">
        <MapPin size={16} />
        {purchaseDate}
      </div>

      <div className="result-info">
        <input 
            className="product-input" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
            placeholder="상품명 입력" 
        />
        <input 
            className="category-input" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            placeholder="카테고리 입력" 
        />

        <div className="price-box">
          <div className="percent-circle">{result.aiConfidence}%</div>
          <input 
            className="price-input" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="금액 입력" 
          />
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
          <label className="sheet-label">만족도</label>
          <div className="satisfaction-buttons" style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {satisfactions.map((s) => (
                <button
                    key={s}
                    className={`satisfaction-button ${satisfactionLevel === s ? 'selected' : ''}`}
                    onClick={() => setSatisfactionLevel(s)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '1px solid #ddd',
                        backgroundColor: satisfactionLevel === s ? '#000' : '#fff',
                        color: satisfactionLevel === s ? '#fff' : '#000',
                    }}
                >
                    {s}
                </button>
            ))}
          </div>

          <label className="sheet-label">한 줄 다이어리</label>
          <textarea
            className="diary-input"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="소비에 대한 생각을 적어주세요"
          />

          <p className="emotion-title">오늘의 감정은?</p>
          <div className="emotion-buttons">
            {emotions.map((emotion) => (
              <button
                key={emotion.value}
                type="button"
                className={
                  emotionTag === emotion.value
                    ? "emotion-button selected"
                    : "emotion-button"
                }
                onClick={() => setEmotionTag(emotion.value)}
              >
                {emotion.label}
              </button>
            ))}
          </div>

          <button className="save-button" onClick={handleSave} style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '12px',
              marginTop: '20px',
              fontWeight: 'bold'
          }}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
