import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Record() {
  const navigate = useNavigate();
  const [step, setStep] = useState("upload");

  const [form, setForm] = useState({
    itemName: "올리브영 스킨케어 제품",
    category: "뷰티",
    amount: 18000,
    emoji: "✨",
    emotion: "기분전환",
    memo: "",
  });

  const analyze = () => {
    setStep("analyzing");
    setTimeout(() => setStep("confirm"), 1200);
  };

  const save = () => {
    const old = JSON.parse(localStorage.getItem("spendings") || "[]");

    const newItem = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
      date: new Date().toISOString().slice(0, 10),
    };

    localStorage.setItem("spendings", JSON.stringify([newItem, ...old]));
    setStep("saved");

    setTimeout(() => navigate("/home"), 900);
  };

  return (
    <div className="app-screen page-padding">
      <h2>오늘의 Buylog</h2>

      {step === "upload" && (
        <section className="record-card">
          <h3>사진 업로드</h3>
          <p>오늘 산 물건이나 영수증 사진을 올려주세요.</p>
          <input type="file" accept="image/*" />
          <button onClick={analyze}>AI 분석 시작</button>
        </section>
      )}

      {step === "analyzing" && (
        <section className="record-card">
          <h3>AI가 소비를 분석하고 있어요</h3>
          <p>무엇을 샀는지, 얼마였는지 확인하는 중이에요.</p>
        </section>
      )}

      {step === "confirm" && (
        <section className="record-card">
          <h3>AI 분석 결과</h3>

          <label>상품명</label>
          <input
            value={form.itemName}
            onChange={(e) => setForm({ ...form, itemName: e.target.value })}
          />

          <label>카테고리</label>
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <label>가격</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <button onClick={() => setStep("emotion")}>맞아요</button>
        </section>
      )}

      {step === "emotion" && (
        <section className="record-card">
          <h3>이 소비는 어떤 감정이었나요?</h3>

          <div className="emotion-grid">
            {[
              ["✨", "잘 샀다"],
              ["❓", "왜 샀지"],
              ["🌸", "기분전환"],
              ["⚡", "스트레스"],
              ["🛍️", "충동구매"],
              ["🎁", "보상심리"],
            ].map(([emoji, emotion]) => (
              <button
                key={emotion}
                className={form.emotion === emotion ? "selected" : ""}
                onClick={() => setForm({ ...form, emoji, emotion })}
              >
                <span>{emoji}</span>
                {emotion}
              </button>
            ))}
          </div>

          <textarea
            placeholder="남기고 싶은 말이 있다면 적어보세요"
            value={form.memo}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
          />

          <button onClick={save}>기록 저장</button>
        </section>
      )}

      {step === "saved" && (
        <section className="record-card">
          <h3>기록 완료!</h3>
          <p>오늘의 소비가 나의 더미에 쌓였어요.</p>
        </section>
      )}
    </div>
  );
}

export default Record;