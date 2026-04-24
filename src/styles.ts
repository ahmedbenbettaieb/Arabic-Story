export const styles = `
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

.score-bar{position:sticky;top:0;z-index:100;background:linear-gradient(135deg,#1a0a3d,#2a1060);border-bottom:1px solid #6040b060;padding:8px 16px;display:flex;justify-content:space-between;align-items:center;}
.score-label{color:#c0a0ff;font-size:13px;}
.score-val{color:#f5d44a;font-weight:700;font-size:18px;font-family:'Amiri',serif;}
.progress-bar{flex:1;height:8px;background:#2a1260;border-radius:4px;margin:0 12px;overflow:hidden;border:1px solid #4020a040;}
.progress-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#6030b0,#f5d44a);transition:width .5s;}

.page{position:relative;z-index:1;padding:16px 12px 40px;max-width:680px;margin:0 auto;}
.hero-title{font-size:28px;font-weight:700;color:#f5d44a;text-shadow:0 0 20px #f5d44a88,0 2px 4px #000;text-align:center;letter-spacing:1px;}
.hero-sub{font-size:14px;color:#c0a0ff;margin-top:4px;text-shadow:0 1px 3px #000;text-align:center;}
.mascots{display:flex;justify-content:center;gap:20px;margin:8px 0 16px;animation:float 3s ease-in-out infinite;}
.mascot{font-size:40px;filter:drop-shadow(0 4px 8px #a060ff80);}

.story-card{background:linear-gradient(135deg,#1e0f50 0%,#2a1268 50%,#1e0f50 100%);border:1px solid #6040b060;border-radius:16px;margin-bottom:16px;overflow:hidden;box-shadow:0 4px 20px #00000060,inset 0 1px 0 #8060c040;animation:glow-pulse 4s ease-in-out infinite;}
.story-card-inner{padding:16px;}
.story-text{color:#e8d8ff;font-size:17px;line-height:2;text-align:right;margin-bottom:12px;text-shadow:0 1px 2px #000;}
.img-frame-outer{position:relative;padding:4px;border-radius:12px;background:linear-gradient(135deg,#f5d44a,#e8a020,#c06010,#e8a020,#f5d44a);}
.img-frame-inner{border-radius:9px;overflow:hidden;border:3px solid #1a0a3d;background:#0a0520;}
.story-img{width:100%;display:block;aspect-ratio:16/9;object-fit:cover;border-radius:6px;}
.corner-gem{position:absolute;width:14px;height:14px;border-radius:50%;background:radial-gradient(circle,#fff 20%,#f5d44a 60%,#e08010 100%);box-shadow:0 0 8px #f5d44a;z-index:2;}

.island-divider{display:flex;align-items:center;gap:8px;margin:20px 0 16px;}
.divider-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,#6040b0,#a070ff,#6040b0,transparent);}
.divider-gem{font-size:16px;filter:drop-shadow(0 0 6px #a070ff);}
.section-label{text-align:center;font-size:16px;color:#f5d44a;margin-bottom:12px;text-shadow:0 0 10px #f5d44a66;letter-spacing:2px;}

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
