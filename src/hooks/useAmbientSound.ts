import { useState, useEffect, useRef } from 'react';

interface AmbientSoundOptions {
  autoPlay?: boolean;
  volume?: number;
  fadeInDuration?: number;
  loop?: boolean;
}

/**
 * Custom hook for ambient sound management
 * Handles audio playback with fade-in, toggle, and easy replacement
 */
export const useAmbientSound = (
  soundPath: string,
  options: AmbientSoundOptions = {}
) => {
  const {
    autoPlay = true,
    volume = 0.3,
    fadeInDuration = 2000,
    loop = true,
  } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Create audio element
    audioRef.current = new Audio(soundPath);
    audioRef.current.loop = loop;
    audioRef.current.volume = 0;

    if (autoPlay) {
      play();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [soundPath, autoPlay, loop]);

  const fadeIn = () => {
    if (!audioRef.current || fadeIntervalRef.current) return;

    const targetVolume = volume;
    const steps = 50;
    const stepDuration = fadeInDuration / steps;
    const volumeIncrement = targetVolume / steps;

    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;

      currentStep++;
      audioRef.current.volume = Math.min(volumeIncrement * currentStep, targetVolume);

      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, stepDuration);
  };

  const play = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      fadeIn();
    } catch (error) {
      console.error('Error playing ambient sound:', error);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  return {
    isPlaying,
    isMuted,
    play,
    pause,
    toggle,
    toggleMute,
  };
};
