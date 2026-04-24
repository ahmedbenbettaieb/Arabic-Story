import { useRef } from "react";

export function useAudio() {
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
