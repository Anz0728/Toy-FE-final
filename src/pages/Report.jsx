import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import "./Report.css";

function Report() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const data = await api.getReport();
        setReport(data);
      } catch (e) {
        console.error("Failed to load report", e);
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, []);

  if (loading) return <div className="app-screen page-padding">리포트를 불러오는 중...</div>;

  return (
    <div className="app-screen page-padding report-page">
      <h2>이번 달 Buylog 리포트</h2>

      {report ? (
        <>
          <div className="report-summary">
            <div className="summary-item">
                <span>총 지출</span>
                <strong>{report.totalAmount?.toLocaleString()}원</strong>
            </div>
            <div className="summary-item">
                <span>총 건수</span>
                <strong>{report.totalCount}건</strong>
            </div>
          </div>

          <div className="report-card">
            <h3>AI 소비 인사이트</h3>
            <p>{report.aiInsight || "기록이 더 쌓이면 AI가 분석을 시작할게요."}</p>
          </div>

          <div className="report-card">
            <h3>나의 소비 원칙</h3>
            <p>{report.nextPrinciple || "소비 기록을 바탕으로 나만의 원칙을 세워보세요."}</p>
          </div>

          <div className="stats-section">
            <h3>주요 소비 감정</h3>
            <div className="top-emotion">
                <strong>{report.topEmotion || "데이터 부족"}</strong>
            </div>
          </div>
        </>
      ) : (
        <p>이번 달 소비 기록이 없습니다.</p>
      )}

      <Link className="back-link" to="/feed">홈으로</Link>
    </div>
  );
}

export default Report;
