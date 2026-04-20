import { useState, useRef, useCallback, useEffect } from 'react';
import { TIMER_DEFAULTS, STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';
import { useAuth } from './useAuth';

/**
 * Custom hook for Pomodoro-style study timer
 * Usage: const { time, isRunning, start, pause, reset } = useStudyTimer();
 */
export function useStudyTimer() {
  const { user } = useAuth();
  const [mode, setMode] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [time, setTime] = useState(TIMER_DEFAULTS.WORK * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [currentSubject, setCurrentSubject] = useState('');
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Timer tick
  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      // Timer completed
      setIsRunning(false);

      if (mode === 'work') {
        // Save study session
        saveSession();
        setSessionsCompleted((prev) => prev + 1);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, time, mode]);

  const saveSession = useCallback(() => {
    if (!user || !startTimeRef.current) return;

    const duration = mode === 'work' ? TIMER_DEFAULTS.WORK : 0;
    if (duration === 0) return;

    const sessions = JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '[]');
    sessions.unshift({
      id: generateId(),
      userId: user.uid,
      subject: currentSubject || 'General',
      duration,
      date: new Date().toISOString(),
      type: 'reading',
      notes: '',
    });
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }, [user, mode, currentSubject]);

  const start = useCallback(() => {
    setIsRunning(true);
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    startTimeRef.current = null;
    const durations = {
      work: TIMER_DEFAULTS.WORK * 60,
      shortBreak: TIMER_DEFAULTS.SHORT_BREAK * 60,
      longBreak: TIMER_DEFAULTS.LONG_BREAK * 60,
    };
    setTime(durations[mode]);
  }, [mode]);

  const switchMode = useCallback((newMode) => {
    setIsRunning(false);
    startTimeRef.current = null;
    setMode(newMode);
    const durations = {
      work: TIMER_DEFAULTS.WORK * 60,
      shortBreak: TIMER_DEFAULTS.SHORT_BREAK * 60,
      longBreak: TIMER_DEFAULTS.LONG_BREAK * 60,
    };
    setTime(durations[newMode]);
  }, []);

  // Format time as MM:SS
  const formattedTime = `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;

  // Progress percentage (for circular timer)
  const totalSeconds = {
    work: TIMER_DEFAULTS.WORK * 60,
    shortBreak: TIMER_DEFAULTS.SHORT_BREAK * 60,
    longBreak: TIMER_DEFAULTS.LONG_BREAK * 60,
  };
  const progress = ((totalSeconds[mode] - time) / totalSeconds[mode]) * 100;

  return {
    time,
    formattedTime,
    isRunning,
    mode,
    progress,
    sessionsCompleted,
    currentSubject,
    setCurrentSubject,
    start,
    pause,
    reset,
    switchMode,
  };
}
