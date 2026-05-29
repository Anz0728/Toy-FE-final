import { Link } from "react-router-dom";

function Today() {
  const spendings = JSON.parse(localStorage.getItem("spendings") || "[]");
  const total = spendings.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="app-screen page-padding">
      <h2>오늘 소비</h2>
      <p>오늘 기록 {spendings.length}개</p>
      <h3>총 {total.toLocaleString()}원</h3>

      {spendings.map((item) => (
        <div className="list-card" key={item.id}>
          <strong>{item.emoji} {item.itemName}</strong>
          <p>{item.amount.toLocaleString()}원 / {item.emotion}</p>
        </div>
      ))}

      <Link className="back-link" to="/home">홈으로</Link>
    </div>
  );
}

export default Today;