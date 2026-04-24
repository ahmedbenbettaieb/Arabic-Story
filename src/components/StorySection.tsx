import type { StoryPart } from "../data/quizData";
interface Props {
  storyParts: StoryPart[];
}

export default function StorySection({ storyParts }: Props) {
  return (
    <div style={{ marginBottom: 24, marginTop: 16 }}>
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
