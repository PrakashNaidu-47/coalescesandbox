import React, { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { 
  Trophy, Users, Bot, User, Clock as ClockIcon, RotateCcw, Flag, ArrowLeft, 
  ShieldCheck, Volume2, VolumeX, Play, Zap, LogOut, CheckCircle2, AlertCircle, Sparkles, Send
} from 'lucide-react';

// --- Simple Web Audio Sound Generator for Chess Effects ---
class SoundManager {
  ctx: AudioContext | null = null;
  enabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  play(type: 'move' | 'capture' | 'check' | 'win' | 'click') {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;

      if (type === 'move') {
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'capture') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'check') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.setValueAtTime(1200, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'win') {
        osc.type = 'sine';
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const noteOsc = this.ctx!.createOscillator();
          const noteGain = this.ctx!.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(this.ctx!.destination);
          noteOsc.frequency.setValueAtTime(freq, now + idx * 0.1);
          noteGain.gain.setValueAtTime(0.2, now + idx * 0.1);
          noteGain.gain.linearRampToValueAtTime(0.01, now + idx * 0.1 + 0.25);
          noteOsc.start(now + idx * 0.1);
          noteOsc.stop(now + idx * 0.1 + 0.25);
        });
      } else if (type === 'click') {
        osc.frequency.setValueAtTime(300, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      }
    } catch (e) {
      console.error('Audio play error:', e);
    }
  }
}

const sounds = new SoundManager();

// --- Piece Symbols ---
const pieceSymbols: Record<string, string> = {
  p: '♟'