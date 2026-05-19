'use client';

import { useCallback } from 'react';

type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'selection' | 'impact';

let iosAudioContext: AudioContext | null = null;

export const useHapticFeedback = () => {
  const triggerHaptic = useCallback((type: HapticFeedbackType = 'light') => {
    // Check if we're in a browser environment and if haptic feedback is supported
    if (typeof window === 'undefined') return;

    try {
      // Check for Haptic Feedback API (modern browsers)
      if ('vibrate' in navigator) {
        let pattern: number | number[] = 10; // default light vibration

        switch (type) {
          case 'light':
            pattern = 10;
            break;
          case 'medium':
            pattern = 20;
            break;
          case 'heavy':
            pattern = 40;
            break;
          case 'selection':
            pattern = [10];
            break;
          case 'impact':
            pattern = [15, 10, 15];
            break;
        }

        navigator.vibrate(pattern);
      }

      // For iOS devices with haptic feedback support
      if (
        window.DeviceMotionEvent &&
        typeof (
          window.DeviceMotionEvent as unknown as {
            requestPermission?: () => Promise<string>;
          }
        ).requestPermission === 'function'
      ) {
        // iOS haptic feedback through AudioContext (workaround)
        // Reuse a single AudioContext to avoid hitting the browser limit
        if (!iosAudioContext) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          iosAudioContext = new AudioContextClass();
        }
        const oscillator = iosAudioContext.createOscillator();
        const gainNode = iosAudioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(iosAudioContext.destination);

        oscillator.frequency.setValueAtTime(0, iosAudioContext.currentTime);
        gainNode.gain.setValueAtTime(0, iosAudioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.01,
          iosAudioContext.currentTime + 0.01,
        );
        gainNode.gain.linearRampToValueAtTime(
          0,
          iosAudioContext.currentTime + 0.02,
        );

        oscillator.start(iosAudioContext.currentTime);
        oscillator.stop(iosAudioContext.currentTime + 0.02);
      }
    } catch (error) {
      // Silently fail if haptic feedback is not supported
      console.debug('Haptic feedback not supported:', error);
    }
  }, []);

  const isMobile = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }, []);

  return {
    triggerHaptic,
    isMobile,
    isSupported: typeof navigator !== 'undefined' && 'vibrate' in navigator,
  };
};
