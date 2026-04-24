import { useState, useEffect } from "react";
import { CONFETTI_PIECES } from "../data/quizData";

interface Props {
  score: number;
  total: number;
  onRetry: () => void;
}

export default function ResultOverlay({ score, total, onRetry }: Props) {
  const [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(
      () => setBarWidth(Math.round((score / total) * 100)),
      150,
    );
    return () => clearTimeout(t);
  }, []);

  const pct = score / total;
  const tier =
    pct >= 0.82
      ? "gold"
      : pct >= 0.55
        ? "silver"
        : pct >= 0.36
          ? "bronze"
          : "sad";
  const cfg = {
    gold: {
      trophy: "🏆",
      title: "إنجاز رائع! أنت نجم!",
      sub: "لقد أتقنتَ القصة وفهمتَ كل دروسها. أحسنتَ!",
      stars: 5,
    },
    silver: {
      trophy: "🥈",
      title: "ممتاز! أداء رائع!",
      sub: "فهمتَ معظم القصة بشكل جيد. استمر هكذا!",
      stars: 4,
    },
    bronze: {
      trophy: "🥉",
      title: "جيد! يمكنك أفضل!",
      sub: "راجع القصة مرة أخرى وستتحسن نتيجتك.",
      stars: 2,
    },
    sad: {
      trophy: "📖",
      title: "تحتاج إلى مراجعة!",
      sub: "اقرأ القصة مجدداً بعناية. أنت قادر على النجاح!",
      stars: 1,
    },
  }[tier];

  return (
    <div className="result-overlay">
      <div className={`result-card ${tier}`}>
        {tier === "gold" &&
          CONFETTI_PIECES.map((c) => (
            <div
              key={c.id}
              className="confetti"
              style={{
                background: c.color,
                left: c.left,
                top: "-10px",
                animationDelay: c.delay,
                animationDuration: c.duration,
              }}
            />
          ))}
        <span className="result-trophy">{cfg.trophy}</span>
        <div className="result-title">{cfg.title}</div>
        <div className="result-sub">{cfg.sub}</div>
        <div className="result-score-row">
          <span className="result-score-num">{score}</span>
          <span className="result-score-denom">/ {total}</span>
        </div>
        <div className="result-stars">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`result-star ${i < cfg.stars ? "lit" : "unlit"}`}
              style={{ animationDelay: `${i * 0.13}s` }}
            >
              ⭐
            </span>
          ))}
        </div>
        <div className="result-bar-wrap">
          <div className="result-bar-fill" style={{ width: `${barWidth}%` }} />
        </div>
        <button className="retry-btn" onClick={onRetry}>
          🔄 أعد المحاولة
        </button>
      </div>
    </div>
  );
}
