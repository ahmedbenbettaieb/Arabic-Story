interface Props {
  score: number;
  answeredCount: number;
  total: number;
}

export default function ScoreBar({ score, answeredCount, total }: Props) {
  return (
    <div className="score-bar">
      <span className="score-label">التقدم</span>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(answeredCount / total) * 100}%` }}
        />
      </div>
      <span className="score-val">⭐ {score}</span>
    </div>
  );
}
