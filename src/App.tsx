import { useState, useEffect, useRef } from "react";

// ─── Audio Engine (Web Audio API — no CDN needed, zero CORS) ─────────────────
function useAudio() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (!ctxRef.current)
      ctxRef.current = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
    return ctxRef.current;
  };

  const note = (
    ctx: AudioContext,
    freq: number,
    start: number,
    dur: number,
    vol = 0.28,
    type: OscillatorType = "sine",
  ) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
    gain.gain.setValueAtTime(vol, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + start + dur,
    );
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + dur + 0.05);
  };

  const playCorrect = () => {
    const ctx = getCtx();
    [
      [523, 0],
      [659, 0.12],
      [784, 0.24],
      [1047, 0.38],
    ].forEach(([f, t]) => note(ctx, f, t, 0.25, 0.28, "sine"));
  };

  const playWrong = () => {
    new Audio("https://instantrimshot.com/audio/priceiswrong.mp3").play();
  };
  const playVictory = () => {
    const ctx = getCtx();
    [
      [523, 0, 0.15],
      [523, 0.16, 0.15],
      [523, 0.32, 0.15],
      [659, 0.5, 0.3],
      [587, 0.82, 0.15],
      [659, 1.0, 0.4],
      [784, 1.42, 0.6],
      [1047, 2.05, 0.8],
    ].forEach(([f, t, d]) => note(ctx, f, t, d, 0.28, "sine"));
    [
      [130, 0],
      [130, 0.5],
      [130, 1.0],
      [196, 1.5],
      [196, 2.0],
    ].forEach(([f, t]) => note(ctx, f, t, 0.3, 0.18, "triangle"));
  };

  const playMedium = () => {
    const ctx = getCtx();
    [
      [523, 0],
      [659, 0.2],
      [523, 0.4],
      [659, 0.65],
    ].forEach(([f, t]) => note(ctx, f, t, 0.3, 0.25, "sine"));
  };

  const playSad = () => {
    const ctx = getCtx();
    [
      [400, 0],
      [370, 0.25],
      [330, 0.5],
      [294, 0.78],
      [262, 1.1],
      [220, 1.45],
    ].forEach(([f, t]) => note(ctx, f, t, 0.35, 0.25, "triangle"));
    note(ctx, 196, 1.85, 0.8, 0.28, "triangle");
  };

  return { playCorrect, playWrong, playVictory, playMedium, playSad };
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');

.fantasy-body{font-family:'Amiri',serif;min-height:100vh;background:linear-gradient(180deg,#080420 0%,#150840 30%,#1a0a4a 60%,#120835 100%);position:relative;overflow-x:hidden;}
.stars-bg{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;}
.star{position:absolute;background:#fff;border-radius:50%;animation:twinkle 2s infinite alternate;}

@keyframes twinkle{0%{opacity:.2;transform:scale(1)}100%{opacity:1;transform:scale(1.4)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes glow-pulse{0%,100%{box-shadow:0 0 15px #a060ff80,0 0 30px #6030c040}50%{box-shadow:0 0 25px #c090ffaa,0 0 50px #8050d060}}
@keyframes shimmer{0%{left:-100%}100%{left:200%}}
@keyframes result-in{0%{opacity:0;transform:scale(0.7) translateY(40px)}100%{opacity:1;transform:scale(1) translateY(0)}}
@keyframes star-pop{0%{transform:scale(0) rotate(-30deg);opacity:0}60%{transform:scale(1.3) rotate(5deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes confetti-fall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(90px) rotate(360deg);opacity:0}}

/* Score bar */
.score-bar{position:sticky;top:0;z-index:100;background:linear-gradient(135deg,#1a0a3d,#2a1060);border-bottom:1px solid #6040b060;padding:8px 16px;display:flex;justify-content:space-between;align-items:center;}
.score-label{color:#c0a0ff;font-size:13px;}
.score-val{color:#f5d44a;font-weight:700;font-size:18px;font-family:'Amiri',serif;}
.progress-bar{flex:1;height:8px;background:#2a1260;border-radius:4px;margin:0 12px;overflow:hidden;border:1px solid #4020a040;}
.progress-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#6030b0,#f5d44a);transition:width .5s;}

/* Page */
.page{position:relative;z-index:1;padding:16px 12px 40px;max-width:680px;margin:0 auto;}
.hero-title{font-size:28px;font-weight:700;color:#f5d44a;text-shadow:0 0 20px #f5d44a88,0 2px 4px #000;text-align:center;letter-spacing:1px;}
.hero-sub{font-size:14px;color:#c0a0ff;margin-top:4px;text-shadow:0 1px 3px #000;text-align:center;}
.mascots{display:flex;justify-content:center;gap:20px;margin:8px 0 16px;animation:float 3s ease-in-out infinite;}
.mascot{font-size:40px;filter:drop-shadow(0 4px 8px #a060ff80);}

/* Story */
.story-card{background:linear-gradient(135deg,#1e0f50 0%,#2a1268 50%,#1e0f50 100%);border:1px solid #6040b060;border-radius:16px;margin-bottom:16px;overflow:hidden;box-shadow:0 4px 20px #00000060,inset 0 1px 0 #8060c040;animation:glow-pulse 4s ease-in-out infinite;}
.story-card-inner{padding:16px;}
.story-text{color:#e8d8ff;font-size:17px;line-height:2;text-align:right;margin-bottom:12px;text-shadow:0 1px 2px #000;}
.img-frame-outer{position:relative;padding:4px;border-radius:12px;background:linear-gradient(135deg,#f5d44a,#e8a020,#c06010,#e8a020,#f5d44a);}
.img-frame-inner{border-radius:9px;overflow:hidden;border:3px solid #1a0a3d;background:#0a0520;}
.story-img{width:100%;display:block;aspect-ratio:16/9;object-fit:cover;border-radius:6px;}
.corner-gem{position:absolute;width:14px;height:14px;border-radius:50%;background:radial-gradient(circle,#fff 20%,#f5d44a 60%,#e08010 100%);box-shadow:0 0 8px #f5d44a;z-index:2;}

/* Divider */
.island-divider{display:flex;align-items:center;gap:8px;margin:20px 0 16px;}
.divider-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,#6040b0,#a070ff,#6040b0,transparent);}
.divider-gem{font-size:16px;filter:drop-shadow(0 0 6px #a070ff);}
.section-label{text-align:center;font-size:16px;color:#f5d44a;margin-bottom:12px;text-shadow:0 0 10px #f5d44a66;letter-spacing:2px;}

/* Questions */
.q-card{margin-bottom:20px;border-radius:16px;overflow:hidden;box-shadow:0 6px 24px #00000080;}
.q-card-border{padding:2px;border-radius:16px;background:linear-gradient(135deg,#f5d44a80,#8050c0,#f5d44a80);}
.q-inner{background:linear-gradient(160deg,#f5e8c0 0%,#ecdfa8 40%,#e5d490 100%);border-radius:14px;padding:14px;position:relative;overflow:hidden;}
.shimmer-line{position:absolute;top:0;left:-100%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);animation:shimmer 2s infinite;pointer-events:none;}
.q-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-direction:row-reverse;}
.q-badge{background:linear-gradient(135deg,#6030b0,#9050e0);color:#f5d44a;font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px;border:1px solid #f5d44a60;box-shadow:0 2px 8px #00000040;font-family:'Amiri',serif;}
.q-text{font-size:17px;font-weight:700;color:#2a0a60;text-align:right;line-height:1.8;margin-bottom:12px;text-shadow:0 1px 2px #f5d44a40;}
.options{display:flex;flex-direction:column;gap:8px;}
.opt-btn{display:flex;align-items:center;gap:10px;flex-direction:row-reverse;padding:10px 12px;border-radius:25px;border:none;cursor:pointer;width:100%;transition:all .15s;font-family:'Amiri',serif;font-size:15px;font-weight:700;position:relative;overflow:hidden;}
.opt-btn:active{transform:scale(0.97);}
.opt-btn:disabled{cursor:default;}
.opt-btn.opt-a{background:linear-gradient(135deg,#1fa050,#27c060);color:#fff;box-shadow:0 3px 10px #1fa05060;}
.opt-btn.opt-b{background:linear-gradient(135deg,#c06010,#e08020);color:#fff;box-shadow:0 3px 10px #c0601060;}
.opt-btn.opt-c{background:linear-gradient(135deg,#6020a0,#9040d0);color:#fff;box-shadow:0 3px 10px #6020a060;}
.opt-btn.opt-d{background:linear-gradient(135deg,#a02040,#c03060);color:#fff;box-shadow:0 3px 10px #a0204060;}
.opt-btn.correct{background:linear-gradient(135deg,#00c850,#00e870)!important;box-shadow:0 0 20px #00c85080!important;border:2px solid #00ff80;}
.opt-btn.wrong{background:linear-gradient(135deg,#e03030,#ff4040)!important;box-shadow:0 0 20px #e0303080!important;border:2px solid #ff6060;}
.opt-btn.reveal{background:linear-gradient(135deg,#00a840,#00c850)!important;opacity:.8;}
.opt-letter{width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.25);border:2px solid rgba(255,255,255,0.5);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;}
.opt-text{flex:1;text-align:right;}
.opt-icon{font-size:16px;flex-shrink:0;}
.feedback{text-align:center;margin-top:10px;font-size:15px;font-weight:700;padding:6px 12px;border-radius:20px;}
.feedback.correct{background:#00c85020;color:#007830;border:1px solid #00c85040;}
.feedback.wrong{background:#e0303020;color:#901010;border:1px solid #e0303040;}

/* Result overlay */
.result-overlay{position:fixed;inset:0;z-index:200;background:rgba(4,1,20,0.92);display:flex;align-items:center;justify-content:center;padding:20px;}
.result-card{width:100%;max-width:420px;border-radius:24px;padding:32px 24px;text-align:center;animation:result-in .5s cubic-bezier(.34,1.56,.64,1) both;position:relative;overflow:hidden;}
.result-card.gold{background:linear-gradient(145deg,#2a1a00,#4a2e00,#2a1a00);border:2px solid #f5d44a;box-shadow:0 0 40px #f5d44a60;}
.result-card.silver{background:linear-gradient(145deg,#101030,#1e1858,#101030);border:2px solid #a0c0ff;box-shadow:0 0 40px #6090ff50;}
.result-card.bronze{background:linear-gradient(145deg,#1a0a00,#301800,#1a0a00);border:2px solid #c08040;box-shadow:0 0 40px #c0804050;}
.result-card.sad{background:linear-gradient(145deg,#100818,#1e1030,#100818);border:2px solid #6040a0;box-shadow:0 0 40px #40208050;}
.result-trophy{font-size:72px;animation:bounce 1.5s ease-in-out infinite;display:block;margin-bottom:8px;}
.result-title{font-size:26px;font-weight:700;margin-bottom:6px;font-family:'Amiri',serif;}
.result-card.gold .result-title{color:#f5d44a;text-shadow:0 0 20px #f5d44a80;}
.result-card.silver .result-title{color:#a0c0ff;text-shadow:0 0 20px #6090ff80;}
.result-card.bronze .result-title{color:#e0a060;text-shadow:0 0 20px #c0804080;}
.result-card.sad .result-title{color:#c0a0ff;}
.result-sub{font-size:15px;color:#c0b0e0;margin-bottom:20px;line-height:1.8;font-family:'Amiri',serif;}
.result-score-row{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:16px;}
.result-score-num{font-size:56px;font-weight:700;font-family:'Amiri',serif;line-height:1;}
.result-card.gold .result-score-num{color:#f5d44a;}
.result-card.silver .result-score-num{color:#a0c0ff;}
.result-card.bronze .result-score-num{color:#e0a060;}
.result-card.sad .result-score-num{color:#c0a0ff;}
.result-score-denom{font-size:22px;color:#8070a0;font-family:'Amiri',serif;}
.result-stars{display:flex;justify-content:center;gap:8px;margin-bottom:20px;}
.result-star{font-size:30px;}
.result-star.lit{animation:star-pop .4s cubic-bezier(.34,1.56,.64,1) both;}
.result-star.unlit{opacity:0.2;filter:grayscale(1);}
.result-bar-wrap{background:#ffffff15;border-radius:20px;height:12px;margin-bottom:24px;overflow:hidden;}
.result-bar-fill{height:100%;border-radius:20px;transition:width 1s .3s;}
.result-card.gold .result-bar-fill{background:linear-gradient(90deg,#c08000,#f5d44a,#ffe880);}
.result-card.silver .result-bar-fill{background:linear-gradient(90deg,#3060c0,#80b0ff,#c0e0ff);}
.result-card.bronze .result-bar-fill{background:linear-gradient(90deg,#804000,#c08040,#e0c080);}
.result-card.sad .result-bar-fill{background:linear-gradient(90deg,#401880,#8040c0,#c080ff);}
.retry-btn{background:linear-gradient(135deg,#6030b0,#9050e0);color:#f5d44a;font-size:18px;font-weight:700;border:1px solid #f5d44a60;border-radius:30px;padding:12px 36px;cursor:pointer;font-family:'Amiri',serif;box-shadow:0 4px 20px #6030b060;transition:transform .1s;}
.retry-btn:active{transform:scale(0.96);}
.confetti{position:absolute;width:8px;height:8px;border-radius:2px;animation:confetti-fall 1.5s ease-in infinite;}
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const LETTERS = ["أ", "ب", "ج", "د"];
const BTN_CLASS = ["opt-a", "opt-b", "opt-c", "opt-d"];
const CONFETTI_COLORS = [
  "#f5d44a",
  "#ff6090",
  "#60d0ff",
  "#a0ff80",
  "#ff90c0",
  "#c0a0ff",
];
const STARS_BG = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  top: Math.random() * 100,
  left: Math.random() * 100,
  delay: Math.random() * 3,
  duration: 1.5 + Math.random() * 2,
}));
const CONFETTI_PIECES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: `${4 + i * 4.8}%`,
  delay: `${(i * 0.07).toFixed(2)}s`,
  duration: `${1.2 + (i % 5) * 0.25}s`,
}));

// ─── Stars Background ─────────────────────────────────────────────────────────
function StarsBg() {
  return (
    <div className="stars-bg">
      {STARS_BG.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Result Overlay ───────────────────────────────────────────────────────────
function ResultOverlay({
  score,
  total,
  onRetry,
}: {
  score: number;
  total: number;
  onRetry: () => void;
}) {
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const audio = useAudio();

  const storyParts = [
    {
      text: "بَنَتْ حَمَامَةٌ عُشَّهَا فِي جِذْعِ شَجَرَةٍ بِالْقُرْبِ مِنْ مَطْعَمِ صَغِيرٍ، فَكَانَ صَاحِبُ الْمَطْعَمِ يَنْتُرُ لَهَا وَلِفِرَاخِهَا فُتَاتَ الْخُبْزِ، لِتَتَغَذَّى بِهِ.",
      img: "/images/img-1.jpeg",
    },
    {
      text: "رَأَى غُرَابٌ الْحَمَامَةَ وَصِغَارَهَا، وَهِيَ تَلْتَقِطُ فُتَاتَ الْخُبْرِ، فَقَرَّرَ أَنْ يَأْكُلَ مَعَهَا.",
      img: "/images/img-2.jpeg",
    },
    {
      text: "مَعَ مُرُورِ الْوَقْتِ كَسَبَ الْغُرَابُ ثِقَّةَ الْحَمَامَةِ فَأَصْبَحَا صَدِيقَيْن.",
      img: "/images/img-3.jpeg",
    },
    {
      text: "زَارَ الْغُرَابُ الْحَمَامَةَ فِي عُشِّها ذَاتَ مَرَّةٍ، وَقَالَ لَهَا: لِمَاذَا نَقْنَعُ بِجَمْعِ فُتَاتِ الْخُبْزِ، وَالْخَيْرُ كَثِيرٌ دَاخِلَ الْمَطْعَمِ؟",
      img: "/images/img-4.jpeg",
    },
    {
      text: "قَالَتِ الْحَمَامَةُ: وَمَاذَا تُرِيدُ أَكْثَر مِمَّا يُقَدِّمُهُ لَنَا صَاحِبُ الْمَطْعَمِ يَوْمِيًّا؟ وَهُوَ يَكْفِينَا، وَالْحَمْدُ لِلَّهِ.",
      img: "/images/img-5.jpeg",
    },
    {
      text: "لَمْ يُصْغِ الْغُرَابُ لِلْحَمَامَةِ، فَعَزَمَ عَلَى دُخُولِ الْمَطْعَمِ لِيَحْصُلَ عَلَى وَجْبَةٍ كَبِيرَةٍ.",
      img: "/images/img-1.jpeg",
    },
    {
      text: "اِقْتَرَبَ الْغُرَابُ مِنَ النَّافِذَةِ، فَرَأَى سَمَكَةً كَبِيرَةً، فَسَالَ لُعَابُهُ طَمَعًا فِي أَكْلِهَا.",
      img: "/images/img-2.jpeg",
    },
    {
      text: "بَيْنَمَا كَانَ الطَّبَّاخُ مُنْشَغِلًا قَفَزَ الْغُرَابُ، فَتَعَثَّرَ وَسَقَطَ عَلَى الْأَرْضِ.",
      img: "/images/img-3.jpeg",
    },
    {
      text: "سَمِعَ الطَّبَّاخُ ضَجَّةً فَالْتَفَتَ، فَرَأَى الْغُرَابَ مُبَلَّلًا بِالْمَرَقِ.",
      img: "/images/img-4.jpeg",
    },
    {
      text: "وَهَكَذَا كَانَتْ عَاقِبَةُ الْغُرَابِ الْجَشَعِ.",
      img: "/images/img-5.jpeg",
    },
  ];

  const questions = [
    {
      id: 0,
      question: "ما معنى الجشع؟",
      options: [
        "الرغبة في الحصول على شيء نفتقده",
        "الرغبة المستمرة في الحصول على المزيد دون اكتفاء",
        "القناعة بما نملك",
        "مشاركة الآخرين بما لدينا",
      ],
      correctIndex: 1,
    },
    {
      id: 1,
      question: "من الشخصية التي تمثل الجشع في القصة؟",
      options: ["الحمامة", "الطباخ", "الغراب", "صاحب المطعم"],
      correctIndex: 2,
    },
    {
      id: 2,
      question: "أيّ الشخصيات تمثل القناعة والرضا؟",
      options: ["الحمامة", "الطباخ", "الغراب", "الزوار"],
      correctIndex: 0,
    },
    {
      id: 3,
      question: "أين تدور أحداث القصة؟",
      options: [
        "في الغابة البعيدة",
        "بالقرب من مطعم صغير",
        "داخل بيت الحمامة",
        "في السوق",
      ],
      correctIndex: 1,
    },
    {
      id: 4,
      question: "ماذا كان يقدم صاحب المطعم للحمامة؟",
      options: ["السمك", "الحبوب", "فتات الخبز", "الماء"],
      correctIndex: 2,
    },
    {
      id: 5,
      question: "من الذي رأى الحمامة وصغارها؟",
      options: ["العصفور", "الغراب", "النسر", "الديك"],
      correctIndex: 1,
    },
    {
      id: 6,
      question: "لماذا أصبح الغراب صديقًا للحمامة؟",
      options: [
        "لأنه ساعدها في بناء العش",
        "لأنه كسب ثقتها مع مرور الوقت",
        "لأنه كان قويًا",
        "لأنه يعيش بالقرب منها",
      ],
      correctIndex: 1,
    },
    {
      id: 7,
      question: "ماذا اقترح الغراب على الحمامة؟",
      options: [
        "مغادرة المكان",
        "بناء عش جديد",
        "دخول المطعم للحصول على طعام أكثر",
        "البحث عن ماء",
      ],
      correctIndex: 2,
    },
    {
      id: 8,
      question: "كيف ردت الحمامة على اقتراح الغراب؟",
      options: [
        "وافقت فورًا",
        "رفضت وأبدت قناعتها بما لديها",
        "غضبت منه",
        "تجاهلته",
      ],
      correctIndex: 1,
    },
    {
      id: 9,
      question: "ماذا حدث للغراب داخل المطعم؟",
      options: [
        "أكل السمكة وهرب",
        "طرده الطباخ فورًا",
        "تعثر وسقط وتبلل بالمرق",
        "اختبأ ولم يره أحد",
      ],
      correctIndex: 2,
    },
    {
      id: 10,
      question: "ما العبرة من القصة؟",
      options: [
        "التعاون بين الأصدقاء مهم",
        "الجشع يؤدي إلى عواقب وخيمة",
        "العمل أفضل من الراحة",
        "يجب الحذر من الغرباء",
      ],
      correctIndex: 1,
    },
  ];

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

      {/* Sticky score bar */}
      <div className="score-bar">
        <span className="score-label">التقدم</span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(answeredCount / TOTAL) * 100}%` }}
          />
        </div>
        <span className="score-val">⭐ {score}</span>
      </div>

      <div className="page">
        {/* Header */}
        <div style={{ textAlign: "center", padding: "20px 0 10px" }}>
          <div className="mascots">
            <span className="mascot">🐦</span>
            <span className="mascot" style={{ animationDelay: ".5s" }}>
              🐦‍⬛
            </span>
          </div>
          <div className="hero-title">قصة الحمامة والغراب</div>
          <div className="hero-sub">✨ رحلة بين القناعة والجشع ✨</div>
        </div>

        {/* Story cards */}
        <div style={{ marginBottom: 24, marginTop: 16 }}>
          {storyParts.map((p, i) => (
            <div key={i} className="story-card">
              <div className="story-card-inner">
                <p className="story-text">{p.text}</p>
                <div className="img-frame-outer">
                  <div className="corner-gem" style={{ top: -3, right: -3 }} />
                  <div className="corner-gem" style={{ top: -3, left: -3 }} />
                  <div
                    className="corner-gem"
                    style={{ bottom: -3, right: -3 }}
                  />
                  <div
                    className="corner-gem"
                    style={{ bottom: -3, left: -3 }}
                  />
                  <div className="img-frame-inner">
                    <img
                      src={p.img}
                      className="story-img"
                      alt={`scene-${i + 1}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="island-divider">
          <div className="divider-line" />
          <div className="divider-gem">💎</div>
          <div className="divider-line" />
        </div>
        <div className="section-label">🎯 أسئلة الاختبار 🎯</div>

        {/* Question cards */}
        <div>
          {questions.map((q, index) => {
            const chosen = answers[q.id];
            const answered = chosen !== undefined;
            return (
              <div key={q.id} className="q-card">
                <div className="q-card-border">
                  <div className="q-inner">
                    <div className="shimmer-line" />
                    <div className="q-header">
                      <div className="q-badge">
                        سؤال {index + 1} / {TOTAL}
                      </div>
                      <div style={{ color: "#f5d44a", fontSize: 13 }}>
                        ⭐ ×1
                      </div>
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
                              {answered &&
                              i === chosen &&
                              chosen !== q.correctIndex
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
          })}
        </div>
      </div>
    </div>
  );
}
