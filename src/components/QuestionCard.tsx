import type { Question } from "../data/quizData";
import { LETTERS, BTN_CLASS } from "../data/quizData";
interface Props {
  q: Question;
  index: number;
  total: number;
  chosen: number | undefined;
  select: (qId: number, optIndex: number) => void;
}

export default function QuestionCard({
  q,
  index,
  total,
  chosen,
  select,
}: Props) {
  const answered = chosen !== undefined;
  return (
    <div className="q-card">
      <div className="q-card-border">
        <div className="q-inner">
          <div className="shimmer-line" />
          <div className="q-header">
            <div className="q-badge">
              سؤال {index + 1} / {total}
            </div>
            <div style={{ color: "#f5d44a", fontSize: 13 }}>⭐ ×1</div>
          </div>
          <p className="q-text">{q.question}</p>
          <div className="options">
            {q.options.map((opt, i) => {
              let extra = "";
              if (answered) {
                if (i === chosen && chosen === q.correctIndex)
                  extra = "correct";
                else if (i === chosen) extra = "wrong";
                else if (i === q.correctIndex) extra = "reveal";
              }
              return (
                <button
                  key={i}
                  className={`opt-btn ${BTN_CLASS[i]} ${extra}`}
                  onClick={() => select(q.id, i)}
                  disabled={answered}
                >
                  <div className="opt-letter">{LETTERS[i]}</div>
                  <span className="opt-text">{opt}</span>
                  <span className="opt-icon">
                    {answered && i === q.correctIndex ? "✅" : ""}
                    {answered && i === chosen && chosen !== q.correctIndex
                      ? "❌"
                      : ""}
                  </span>
                </button>
              );
            })}
          </div>
          {answered && (
            <p
              className={`feedback ${chosen === q.correctIndex ? "correct" : "wrong"}`}
            >
              {chosen === q.correctIndex
                ? "🌟 أحسنت! إجابة صحيحة!"
                : `❌ الإجابة الصحيحة: ${q.options[q.correctIndex]}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
