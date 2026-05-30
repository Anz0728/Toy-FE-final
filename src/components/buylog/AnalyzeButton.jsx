import './AnalyzeButton.css';

function AnalyzeButton({ onClick }) {
    return (
        <button className="analyze-button" onClick={onClick}>
            AI 분석하기
        </button>
    );
}

export default AnalyzeButton;
