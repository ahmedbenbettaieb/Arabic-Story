import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { useAudio } from "../hooks/useAudio";
import { questions, storyParts } from "../data/quizData";
import StarsBg from "../components/StarsBg";
import ScoreBar from "../components/ScoreBar";
import StorySection from "../components/StorySection";
import QuestionCard from "../components/QuestionCard";
import ResultOverlay from "../components/ResultOverlay";

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const audio = useAudio();
  const navigate = useNavigate();

  const TOTAL = questions.length;
  const answeredCount = Object.keys(answers).length;
  const score = Object.entries(answers).filter(
    ([id, opt]) => questions[Number(id)].correctIndex === opt,
  ).length;

  const select = (qId: number, optIndex: number) => {
    setAnswers((prev) => {
      if (prev[qId] !== undefined) return prev;
      const next = { ...prev, [qId]: optIndex };
      const isCorrect = questions[qId].correctIndex === optIndex;
      if (isCorrect) audio.playCorrect();
      else audio.playWrong();
      if (Object.keys(next).length === TOTAL) {
        const finalScore = Object.entries(next).filter(
          ([id, opt]) => questions[Number(id)].correctIndex === opt,
        ).length;
        const pct = finalScore / TOTAL;
        setTimeout(() => {
          if (pct >= 0.82) audio.playVictory();
          else if (pct >= 0.55) audio.playMedium();
          else audio.playSad();
          setShowResult(true);
        }, 700);
      }
      return next;
    });
  };

  const handleRetry = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div className="fantasy-body" dir="rtl">
      <style>{styles}</style>
      <StarsBg />
      {showResult && (
        <ResultOverlay score={score} total={TOTAL} onRetry={handleRetry} />
      )}
      <ScoreBar score={score} answeredCount={answeredCount} total={TOTAL} />
      <div className="page">
        <div style={{ textAlign: "center", padding: "20px 0 10px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "1px solid #6040b060",
              color: "#c0a0ff",
              borderRadius: "20px",
              padding: "6px 16px",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "'Amiri', serif",
              marginBottom: "12px",
            }}
          >
            ← العودة للمكتبة
          </button>
          <div className="mascots">
            <span className="mascot">🐦</span>
            <span className="mascot" style={{ animationDelay: ".5s" }}>
              🐦‍⬛
            </span>
          </div>
          <div className="hero-title">قصة الحمامة والغراب</div>
          <div className="hero-sub">✨ رحلة بين القناعة والجشع ✨</div>
        </div>
        <StorySection storyParts={storyParts} />
        <div className="island-divider">
          <div className="divider-line" />
          <div className="divider-gem">💎</div>
          <div className="divider-line" />
        </div>
        <div className="section-label">🎯 أسئلة الاختبار 🎯</div>
        <div>
          {questions.map((q, index) => (
            <QuestionCard
              key={q.id}
              q={q}
              index={index}
              total={TOTAL}
              chosen={answers[q.id]}
              select={select}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
