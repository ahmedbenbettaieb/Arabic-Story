import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import StarsBg from "../components/StarsBg";
import { stories } from "../data/storiesData";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="fantasy-body" dir="rtl">
      <style>{styles}</style>
      <style>{`
        .home-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 16px 0 48px;
        }

        .home-card {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 24px #00000080;
        }

        .home-card.unlocked {
          cursor: pointer;
          animation: glow-pulse 4s ease-in-out infinite;
        }

        .home-card.unlocked:active {
          transform: scale(0.97);
        }

        .home-card.locked {
          opacity: 0.60;
          filter: grayscale(0.3);
          cursor: default;
        }

        .home-card-border {
          padding: 2px;
          border-radius: 16px;
          background: linear-gradient(135deg, #f5d44a80, #8050c0, #f5d44a80);
        }

        .home-card.locked .home-card-border {
          background: linear-gradient(135deg, #55555580, #777, #55555580);
        }

        .home-card-inner {
          background: linear-gradient(160deg, #1e0f50 0%, #2a1268 50%, #1e0f50 100%);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: row-reverse;
          align-items: stretch;
          min-height: 110px;
        }

        .home-card-cover {
          width: 110px;
          flex-shrink: 0;
          object-fit: cover;
          display: block;
        }

        .home-card-cover-placeholder {
          width: 110px;
          flex-shrink: 0;
          background: linear-gradient(135deg, #2a1268, #1a0a3d);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
        }

        .home-card-body {
          flex: 1;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          text-align: right;
        }

        .home-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #f5d44a;
          font-family: 'Amiri', serif;
          text-shadow: 0 0 10px #f5d44a55;
        }

        .home-card.locked .home-card-title {
          color: #999;
          text-shadow: none;
        }

        .home-card-sub {
          font-size: 13px;
          color: #c0a0ff;
          font-family: 'Amiri', serif;
        }

        .home-card.locked .home-card-sub {
          color: #666;
        }

        .home-card-start {
          margin-top: 6px;
          background: linear-gradient(135deg, #6030b0, #9050e0);
          color: #f5d44a;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid #f5d44a60;
          border-radius: 20px;
          padding: 5px 16px;
          font-family: 'Amiri', serif;
          display: inline-block;
          width: fit-content;
        }
      `}</style>

      <div className="page">
        <div style={{ textAlign: "center", padding: "28px 0 20px" }}>
          <div className="mascots">
            <span className="mascot">📚</span>
            <span className="mascot" style={{ animationDelay: ".4s" }}>
              ✨
            </span>
            <span className="mascot" style={{ animationDelay: ".8s" }}>
              📖
            </span>
          </div>
          <div className="hero-title">مكتبة القصص</div>
          <div className="hero-sub">✨ اختر قصتك وابدأ رحلتك ✨</div>
        </div>

        <div className="home-grid">
          {stories.map((s) => (
            <div
              key={s.id}
              className={`home-card ${s.unlocked ? "unlocked" : "locked"}`}
              onClick={() => s.unlocked && navigate(s.route)}
            >
              <div className="home-card-border">
                <div className="home-card-inner">
                  {s.cover ? (
                    <img
                      src={s.cover}
                      className="home-card-cover"
                      alt={s.title}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                        (
                          e.currentTarget.nextSibling as HTMLElement
                        ).style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="home-card-cover-placeholder"
                    style={{ display: s.cover ? "none" : "flex" }}
                  >
                    {s.emoji}
                  </div>
                  <div className="home-card-body">
                    <div className="home-card-title">{s.title}</div>
                    <div className="home-card-sub">{s.subtitle}</div>
                    {s.unlocked && (
                      <div className="home-card-start">ابدأ القراءة ←</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <StarsBg />
    </div>
  );
}
