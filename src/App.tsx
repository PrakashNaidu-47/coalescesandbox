// src/App.tsx - Interactive Pomodoro Focus Station for CUSTOM-WVKF
// Summary: create a website for chess game

import React, { useState, useEffect } from 'react';

type Mode = 'focus' | 'shortBreak' | 'longBreak';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  pomodoros: number;
}

export default function PomodoroApplication() {
  const [mode, setMode] = useState<Mode>('focus');
  const [durations] = useState({ focus: 25, shortBreak: 5, longBreak: 15 });
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Review project specifications', completed: true, pomodoros: 2 },
    { id: 2, text: 'Implement Pomodoro timer workflow', completed: false, pomodoros: 1 },
    { id: 3, text: 'Verify sound alerts & cycle progression', completed: false, pomodoros: 0 },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const totalTime = durations[mode] * 60;
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const playSound = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.35);
      });
    } catch (e) {
      // Audio fallback
    }
  };

  useEffect(() => {
    setTimeLeft(durations[mode] * 60);
    setIsRunning(false);
  }, [mode, durations]);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      playSound();
      setIsRunning(false);
      if (mode === 'focus') {
        const newCount = sessionsCompleted + 1;
        setSessionsCompleted(newCount);
        if (newCount % 4 === 0) {
          setMode('longBreak');
        } else {
          setMode('shortBreak');
        }
      } else {
        setMode('focus');
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, sessionsCompleted, soundEnabled]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode] * 60);
  };
  const skipTimer = () => {
    setIsRunning(false);
    if (mode === 'focus') {
      setMode('shortBreak');
    } else {
      setMode('focus');
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText.trim(), completed: false, pomodoros: 0 }]);
    setNewTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const modeColors: Record<Mode, { primary: string; bg: string; glow: string }> = {
    focus: { primary: '#f43f5e', bg: '#881337', glow: 'rgba(244, 63, 94, 0.35)' },
    shortBreak: { primary: '#10b981', bg: '#064e3b', glow: 'rgba(16, 185, 129, 0.35)' },
    longBreak: { primary: '#0ea5e9', bg: '#0c4a6e', glow: 'rgba(14, 165, 233, 0.35)' },
  };

  const currentTheme = modeColors[mode];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#090d16',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      padding: '32px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '9999px',
          backgroundColor: '#1e293b',
          color: currentTheme.primary,
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          Ticket CUSTOM-WVKF
        </div>
        <h1 style={{ margin: '0 0 6px 0', fontSize: '1.9rem', fontWeight: 800 }}>
          Pomodoro Focus Station
        </h1>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '440px' }}>
          create a website for chess game
        </p>
      </header>

      {/* Main Timer Card */}
      <div style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#111827',
        border: '1px solid #1f2937',
        borderRadius: '24px',
        padding: '28px',
        boxShadow: `0 20px 40px ${currentTheme.glow}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Mode Selector Tabs */}
        <div style={{
          display: 'flex',
          backgroundColor: '#1f2937',
          padding: '4px',
          borderRadius: '9999px',
          gap: '4px',
          marginBottom: '24px',
        }}>
          {(['focus', 'shortBreak', 'longBreak'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: mode === m ? currentTheme.primary : 'transparent',
                color: mode === m ? '#ffffff' : '#94a3b8',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {m === 'focus' ? '🎯 Focus (25m)' : m === 'shortBreak' ? '☕ Short Break (5m)' : '🌴 Long Break (15m)'}
            </button>
          ))}
        </div>

        {/* Circular Progress Ring with Digital Time */}
        <div style={{ position: 'relative', width: '250px', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="250" height="250" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="125"
              cy="125"
              r={radius}
              stroke="#1e293b"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="125"
              cy="125"
              r={radius}
              stroke={currentTheme.primary}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.3s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div style={{ fontSize: '3.6rem', fontWeight: 800, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
              {formattedTime}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              {isRunning ? 'Session Active' : 'Paused'}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', width: '100%', justifyContent: 'center' }}>
          <button
            onClick={toggleTimer}
            style={{
              flex: 1,
              maxWidth: '160px',
              padding: '14px 20px',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: currentTheme.primary,
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: `0 4px 14px ${currentTheme.glow}`,
            }}
          >
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </button>
          <button
            onClick={resetTimer}
            style={{
              padding: '14px 18px',
              borderRadius: '14px',
              border: '1px solid #374151',
              backgroundColor: '#1f2937',
              color: '#e2e8f0',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            🔄 Reset
          </button>
          <button
            onClick={skipTimer}
            style={{
              padding: '14px 18px',
              borderRadius: '14px',
              border: '1px solid #374151',
              backgroundColor: '#1f2937',
              color: '#e2e8f0',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ⏭ Skip
          </button>
        </div>

        {/* Status Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid #1f2937',
          fontSize: '0.85rem',
          color: '#94a3b8',
        }}>
          <div>
            🍅 Completed: <strong style={{ color: '#f8fafc' }}>{sessionsCompleted}</strong>
          </div>
          <div
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            {soundEnabled ? '🔔 Sound: On' : '🔕 Sound: Off'}
          </div>
        </div>
      </div>

      {/* Daily Task Checklist */}
      <div style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#111827',
        border: '1px solid #1f2937',
        borderRadius: '20px',
        padding: '24px',
        marginTop: '24px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>
            Daily Tasks & Action Items
          </h2>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['all', 'active', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  background: filter === f ? '#334155' : 'transparent',
                  color: filter === f ? '#f8fafc' : '#64748b',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Add Task Input */}
        <form onSubmit={addTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a task to focus on..."
            style={{
              flex: 1,
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '10px',
              padding: '10px 14px',
              color: '#f8fafc',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: currentTheme.primary,
              border: 'none',
              borderRadius: '10px',
              padding: '10px 16px',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            + Add
          </button>
        </form>

        {/* Task List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '16px', color: '#64748b', fontSize: '0.85rem' }}>
              No tasks found. Add a task above to begin.
            </div>
          ) : (
            filteredTasks.map((t) => (
              <div
                key={t.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#1a2234',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #243046',
                }}
              >
                <div
                  onClick={() => toggleTask(t.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => {}}
                    style={{ width: '16px', height: '16px', accentColor: currentTheme.primary, cursor: 'pointer' }}
                  />
                  <span style={{
                    fontSize: '0.9rem',
                    color: t.completed ? '#64748b' : '#f1f5f9',
                    textDecoration: t.completed ? 'line-through' : 'none',
                  }}>
                    {t.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(t.id)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                  title="Delete task"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
