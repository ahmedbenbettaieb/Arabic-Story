import { useState, useCallback, useRef } from "react";

function splitIntoSentences(text: string): string[] {
  return text
    .split(/[.،؟!]/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function useStorySpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const queueRef = useRef<string[]>([]);
  const cancelledRef = useRef(false);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopKeepAlive = useCallback(() => {
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
  }, []);

  const startKeepAlive = useCallback(() => {
    stopKeepAlive();
    keepAliveRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        stopKeepAlive();
      }
    }, 10000);
  }, [stopKeepAlive]);

  const speakNext = useCallback(() => {
    if (cancelledRef.current || queueRef.current.length === 0) {
      setIsPlaying(false);
      stopKeepAlive();
      return;
    }

    const text = queueRef.current.shift()!;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.88;

    const voices = window.speechSynthesis.getVoices();
    const arabicVoice =
      voices.find((v) => v.lang === "ar-SA") ??
      voices.find((v) => v.lang.startsWith("ar"));
    if (arabicVoice) utterance.voice = arabicVoice;

    utterance.onend = () => speakNext();
    utterance.onerror = (e) => {
      console.error("utterance error", e);
      speakNext();
    };

    window.speechSynthesis.speak(utterance);
  }, [stopKeepAlive]);

  const speak = useCallback(
    (parts: string[]) => {
      if (!window.speechSynthesis) {
        console.error("SpeechSynthesis not supported");
        return;
      }

      window.speechSynthesis.cancel();
      cancelledRef.current = false;

      const sentences = parts.flatMap((p) => splitIntoSentences(p));
      console.log("Speaking", sentences.length, "sentences");
      queueRef.current = sentences;
      setIsPlaying(true);
      startKeepAlive();

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        speakNext();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.onvoiceschanged = null;
          speakNext();
        };
      }
    },
    [speakNext, startKeepAlive],
  );

  const stop = useCallback(() => {
    cancelledRef.current = true;
    queueRef.current = [];
    stopKeepAlive();
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [stopKeepAlive]);

  return { speak, stop, isPlaying };
}
