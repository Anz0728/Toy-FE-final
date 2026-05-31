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
      
      // Automatically "Save to Album" (Download)
      const downloadLink = document.createElement('a');
      downloadLink.href = fullImageUrl;
      downloadLink.download = `buylog_${new Date().getTime()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      alert("소비 기록이 저장되고 앨범에 저장되었습니다!");
      navigate("/feed"); // Navigate to Feed (the "Album" view)
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
    if (nextY <= 0 && nextY >= -480) { // Increased pull-up limit
      setSheetY(nextY);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (sheetY < -240) { // Adjusted snapping point
      setSheetY(-480);
    } else {
      setSheetY(0);
    }
  };

  if (!result) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  const fullImageUrl = (imageUrl?.startsWith('http') || imageUrl?.startsWith('blob:')) 
    ? imageUrl 
    : `${BASE_URL}${imageUrl}`;

  return (
    <div className="phone-frame result-page scrollable">
      <div className="top-bar result-top fixed">
        <span className="top-time">9:41</span>
        <div className="top-icons">
          <span>●●●</span>
          <span>⌁</span>
          <span className="battery"></span>
        </div>
      </div>

      <button className="result-back fixed" onClick={() => navigate("/buylog")}>
        <ChevronLeft size={24} />
      </button>

      <div className="result-scroll-content">
        <div className="result-analysis-section">
          <div
            className="result-main-image"
            style={{ backgroundImage: `url(${fullImageUrl})` }}
          >
            <div className="result-overlay-gradient"></div>
            <div className="location-pill-inline">
              <MapPin size={16} />
              {purchaseDate}
            </div>
            
            <div className="analysis-card-float">
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
                <div className="price-box-inline">
                    <div className="percent-circle-small">{result.aiConfidence}%</div>
                    <input 
                        className="price-input-small" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="금액 입력" 
                    />
                </div>
            </div>
          </div>
        </div>

        <div className="result-form-section">
          <div className="form-group">
            <label className="section-label">소비 만족도</label>
            <div className="satisfaction-row">
                {satisfactions.map((s) => (
                    <button
                        key={s}
                        className={`satisfaction-item ${satisfactionLevel === s ? 'active' : ''}`}
                        onClick={() => setSatisfactionLevel(s)}
                    >
                        {s}
                    </button>
                ))}
            </div>
          </div>

          <div className="form-group">
            <label className="section-label">한 줄 다이어리</label>
            <textarea
                className="diary-textarea"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="오늘의 소비는 어땠나요?"
            />
          </div>

          <div className="form-group">
            <label className="section-label">오늘의 감정</label>
            <div className="emotion-grid">
                {emotions.map((emotion) => (
                <button
                    key={emotion.value}
                    type="button"
                    className={`emotion-item ${emotionTag === emotion.value ? "active" : ""}`}
                    onClick={() => setEmotionTag(emotion.value)}
                >
                    {emotion.label}
                </button>
                ))}
            </div>
          </div>

          <button className="final-save-button" onClick={handleSave}>
            소비 기록 완료하기
          </button>
          
          <div className="bottom-spacing" />
        </div>
      </div>
    </div>
  );
}

export default Result;
