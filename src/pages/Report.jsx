import { Link } from "react-router-dom";

function Report() {
  return (
    <div className="app-screen page-padding">
      <h2>이번 달 Buylog 리포트</h2>

      <div className="report-card">
        <p>이번 달 가장 많이 나타난 감정은 기분전환이에요.</p>
        <p>뷰티/카페 소비는 만족도가 높은 편이에요.</p>
        <p>추천 소비 원칙: 밤 10시 이후 충동구매는 하루 뒤 다시 확인하기</p>
      </div>

      <Link className="back-link" to="/home">홈으로</Link>
    </div>
  );
}

export default Report;