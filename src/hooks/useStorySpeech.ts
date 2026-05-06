import { useState, useRef, useCallback } from "react";

export function useStorySpeech() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsLoading(true);
      setIsPlaying(false);
      
      const response = await fetch(`/api/tts?text=${encodeURIComponent(text)}`);
      if (!response.ok) throw new Error("TTS API failed");
      
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const newAudio = new Audio(audioUrl);
      
      newAudio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audioRef.current = newAudio;
      await newAudio.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch (error) {
      console.error("TTS Error:", error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  return { speak, stop, isLoading, isPlaying };
}
