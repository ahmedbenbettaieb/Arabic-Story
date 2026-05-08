import { useMemo } from "react";
import type { StoryPart } from "../data/quizData";
import { useStorySpeech } from "../hooks/useStorySpeech";

interface Props {
  storyParts: StoryPart[];
}

export default function StorySection({ storyParts }: Props) {
  const { speak, stop, isPlaying } = useStorySpeech();

  const storyQueue = useMemo(() => storyParts.map((p) => p.text), [storyParts]);

  return (
    <div style={{ marginBottom: 24, marginTop: 16 }}>
      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <button
          onClick={() => speak(storyQueue)}
          disabled={isPlaying}
          style={{
            marginRight: "8px",
            padding: "6px 14px",
            borderRadius: "20px",
            border: "1px solid #6040b060",
            background: isPlaying ? "#1a4b2d" : "#2a1b3d",
            color: isPlaying ? "#5fef7f" : "#c0a0ff",
            cursor: isPlaying ? "default" : "pointer",
            fontFamily: "'Amiri', serif",
          }}
        >
          {isPlaying ? "🔊 قيد التشغيل..." : "▶️ قراءة القصة"}
        </button>

        <button
          onClick={stop}
          style={{
            padding: "6px 14px",
            borderRadius: "20px",
            border: "1px solid #6040b060",
            background: "transparent",
            color: "#ff90c0",
            cursor: "pointer",
            fontFamily: "'Amiri', serif",
          }}
        >
          ⏹ إيقاف
        </button>
      </div>

      {storyParts.map((p, i) => (
        <div key={i} className="story-card">
          <div className="story-card-inner">
            <p className="story-text">{p.text}</p>
            <div className="img-frame-outer">
              <div className="corner-gem" style={{ top: -3, right: -3 }} />
              <div className="corner-gem" style={{ top: -3, left: -3 }} />
              <div className="corner-gem" style={{ bottom: -3, right: -3 }} />
              <div className="corner-gem" style={{ bottom: -3, left: -3 }} />
              <div className="img-frame-inner">
                <img src={p.img} className="story-img" alt={`scene-${i + 1}`} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
