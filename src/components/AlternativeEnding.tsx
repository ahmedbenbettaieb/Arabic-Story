import { useState } from "react";

export default function AlternativeEnding() {
  const [text, setText] = useState<string>(
    "اكتب تصوّر نهاية أخرى للقصة هنا...",
  );

  return (
    <div className="story-card" style={{ marginTop: "20px" }}>
      <div className="story-card-inner">
        <div className="section-label">✨ تصوّر نهاية أخرى للقصة ✨</div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="story-text"
          style={{
            width: "100%",
            minHeight: "120px",
            background: "transparent",
            border: "1px solid #6040b060",
            borderRadius: "12px",
            padding: "10px",
            color: "#fff",
            outline: "none",
            fontFamily: "'Amiri', serif",
            resize: "none",
          }}
        />
      </div>
    </div>
  );
}
