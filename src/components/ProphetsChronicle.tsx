import * as React from 'react';
import { BookOpen, Volume2, VolumeX, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { PROPHETS_DATA } from '../config/prophetTimelineData';
import type { SearchEngine } from '../search/searchEngine';
import type { ScriptureEntry } from '../types/scripture';
import { ResultCard } from './ResultCard';

// Helper interface for falling leaves/embers
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  angle?: number;
  spin?: number;
}

interface ProphetsChronicleProps {
  searchEngine: SearchEngine;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onReadContext: (entry: ScriptureEntry) => void;
  onExit: () => void;
}

export function ProphetsChronicle({
  searchEngine,
  bookmarks,
  onToggleBookmark,
  onReadContext,
  onExit,
}: ProphetsChronicleProps) {
  const [activeId, setActiveId] = React.useState('adam');
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const [isPlayingSound, setIsPlayingSound] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const timeRef = React.useRef<number>(0);
  const particlesRef = React.useRef<Particle[]>([]);

  // Web Audio Synthesizer Refs
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const audioNodesRef = React.useRef<AudioNode[]>([]);

  const activeProfile = React.useMemo(() => {
    return PROPHETS_DATA.find(p => p.id === activeId) || PROPHETS_DATA[0];
  }, [activeId]);

  const activeStep = React.useMemo(() => {
    return activeProfile.steps[activeStepIndex] || activeProfile.steps[0];
  }, [activeProfile, activeStepIndex]);

  // Audio synthetics manager
  const stopAmbientSound = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    audioNodesRef.current = [];
    setIsPlayingSound(false);
  };

  const playAmbientSound = () => {
    if (audioContextRef.current) {
      stopAmbientSound();
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) throw new Error('Web Audio not supported');
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      const filterNode = ctx.createBiquadFilter();
      filterNode.type = 'lowpass';

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.02, ctx.currentTime);

      noiseNode.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(ctx.destination);
      noiseNode.start(0);

      audioNodesRef.current.push(noiseNode);

      if (activeStep.ambientType === 'waves') {
        filterNode.frequency.setValueAtTime(240, ctx.currentTime);
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(120, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filterNode.frequency);
        lfo.start();
        audioNodesRef.current.push(lfo);
      } else if (activeStep.ambientType === 'fire') {
        filterNode.frequency.setValueAtTime(280, ctx.currentTime);
        const crackleInterval = setInterval(() => {
          if (!audioContextRef.current) {
            clearInterval(crackleInterval);
            return;
          }
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(130 + Math.random() * 200, ctx.currentTime);
          g.gain.setValueAtTime(0.035 * Math.random(), ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.04);
        }, 180);
      } else if (activeStep.ambientType === 'wind') {
        filterNode.frequency.setValueAtTime(300, ctx.currentTime);
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.15, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(80, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filterNode.frequency);
        lfo.start();
        audioNodesRef.current.push(lfo);
      } else {
        filterNode.frequency.setValueAtTime(180, ctx.currentTime);
        const osc = ctx.createOscillator();
        const oGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        oGain.gain.setValueAtTime(0.012, ctx.currentTime);
        osc.connect(oGain);
        oGain.connect(ctx.destination);
        osc.start();
        audioNodesRef.current.push(osc);
      }

      setIsPlayingSound(true);
    } catch (err) {
      console.error('Failed to initialize ambient audio synth:', err);
    }
  };

  React.useEffect(() => {
    let t: number | null = null;
    if (isPlayingSound) {
      Promise.resolve().then(() => {
        stopAmbientSound();
        t = window.setTimeout(() => {
          playAmbientSound();
        }, 80);
      });
    }
    return () => {
      if (t !== null) window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStepIndex, activeId]);

  React.useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, [activeId]);

  // Fetch scripture reference results
  const scriptures = React.useMemo(() => {
    const list: ScriptureEntry[] = [];
    activeStep.quranRefs.forEach(ref => {
      const [chapStr, verStr] = ref.split(':');
      if (chapStr && verStr) {
        const chap = parseInt(chapStr, 10);
        const ver = parseInt(verStr, 10);
        const docs = searchEngine.searchCollections({
          query: '',
          book: 'Quran',
          chapter: chap,
        });
        const match = docs.find(doc => doc.verse === ver);
        if (match) list.push(match);
      }
    });
    return list;
  }, [activeStep, searchEngine]);

  // 100% Full-Screen Canvas Drawing Algorithm
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize particles database
    const initParticles = () => {
      particlesRef.current = [];
      const count = activeStep.particles === 'rain' ? 80 : 35;
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.4 - 0.2,
          speedY: Math.random() * 1.5 + 0.5,
          color: '',
          alpha: Math.random() * 0.5 + 0.2,
          angle: Math.random() * Math.PI * 2,
          spin: Math.random() * 0.02 - 0.01,
        });
      }
    };

    initParticles();

    // Scene Rendering Loops
    const drawSky = (c1: string, c2: string, c3: string) => {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, c1);
      grad.addColorStop(0.5, c2);
      grad.addColorStop(1, c3);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    };

    const drawHill = (yBase: number, color: string, amplitude: number, frequency: number, timeOffset: number, drawFoam = false) => {
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = yBase + Math.sin(x * frequency + timeOffset) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      if (drawFoam) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 15) {
          const y = yBase + Math.sin(x * frequency + timeOffset) * amplitude;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    };

    // Helper for grass blades clusters along hill crests
    const drawGrassTips = (yBase: number, color: string, amplitude: number, frequency: number, timeOffset: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 30; x < width; x += 60) {
        const y = yBase + Math.sin(x * frequency + timeOffset) * amplitude;
        // Grass cluster blades
        ctx.moveTo(x, y);
        ctx.lineTo(x - 3, y - 10);
        ctx.moveTo(x, y);
        ctx.lineTo(x + 3, y - 9);
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - 12);
      }
      ctx.stroke();
    };

    const renderLoop = () => {
      timeRef.current += 1;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      // SWITCH DRAW ROUTINES ACCORDING TO PROPHET ID
      if (activeId === 'adam') {
        // LUSH PRIMORDIAL EARTH (Matching user uploaded image)
        drawSky('#dbeafe', '#fef08a', '#fcd34d'); // sky gradient sunrise

        // Rotating Sunbeams
        ctx.save();
        ctx.translate(width * 0.35, height * 0.55);
        ctx.rotate(t * 0.0005);
        ctx.fillStyle = 'rgba(253, 224, 71, 0.04)';
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(2500, -80);
          ctx.lineTo(2500, 80);
          ctx.closePath();
          ctx.fill();
          ctx.rotate(Math.PI / 3);
        }
        ctx.restore();

        // Sun Glow
        ctx.beginPath();
        ctx.arc(width * 0.35, height * 0.55 + Math.sin(t * 0.001) * 5, 55, 0, Math.PI * 2);
        const sunGrad = ctx.createRadialGradient(width*0.35, height*0.55, 5, width*0.35, height*0.55, 55);
        sunGrad.addColorStop(0, '#ffffff');
        sunGrad.addColorStop(0.3, '#fef08a');
        sunGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
        ctx.fillStyle = sunGrad;
        ctx.fill();

        // Far mountains with shading details
        ctx.beginPath();
        ctx.moveTo(0, height * 0.7);
        ctx.lineTo(width * 0.25, height * 0.52);
        ctx.lineTo(width * 0.5, height * 0.68);
        ctx.lineTo(width * 0.75, height * 0.48);
        ctx.lineTo(width, height * 0.7);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        const mountainGrad = ctx.createLinearGradient(0, height * 0.48, 0, height);
        mountainGrad.addColorStop(0, '#c084fc');
        mountainGrad.addColorStop(1, '#818cf8');
        ctx.fillStyle = mountainGrad;
        ctx.fill();

        // Rocky ridges on far mountains
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(width * 0.25, height * 0.52); ctx.lineTo(width * 0.27, height * 0.65);
        ctx.moveTo(width * 0.75, height * 0.48); ctx.lineTo(width * 0.72, height * 0.62);
        ctx.stroke();

        // Far Hills + grass tips
        drawHill(height * 0.72, '#4d7c0f', 12, 0.003, t * 0.001); // olive green
        drawGrassTips(height * 0.72, '#3f6212', 12, 0.003, t * 0.001);
        
        // Mid Hills + grass tips
        drawHill(height * 0.78, '#3f6212', 15, 0.004, -t * 0.0015);
        drawGrassTips(height * 0.78, '#1e293b/30', 15, 0.004, -t * 0.0015);

        // Near Hills
        drawHill(height * 0.85, '#166534', 8, 0.002, t * 0.0008);
        drawGrassTips(height * 0.85, '#14532d', 8, 0.002, t * 0.0008);

        // Draw Left Tree (trunk + wood grain bark + branches + leaves swaying)
        const trunkSway = Math.sin(t * 0.015) * 4;
        ctx.fillStyle = '#78350f'; // wood brown
        ctx.beginPath();
        ctx.moveTo(50, height);
        ctx.quadraticCurveTo(60, height * 0.65, 80 + trunkSway, height * 0.45);
        ctx.lineTo(110 + trunkSway, height * 0.45);
        ctx.quadraticCurveTo(90, height * 0.65, 110, height);
        ctx.closePath();
        ctx.fill();

        // Intricate wood grains bark detailing
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(65, height);
        ctx.quadraticCurveTo(75, height * 0.65, 90 + trunkSway, height * 0.45);
        ctx.moveTo(85, height);
        ctx.quadraticCurveTo(95, height * 0.65, 100 + trunkSway, height * 0.45);
        ctx.stroke();

        // Draw leafy canopy layers
        ctx.fillStyle = '#15803d'; // green leaves
        ctx.beginPath();
        ctx.arc(80 + trunkSway, height * 0.42, 65, 0, Math.PI * 2);
        ctx.arc(130 + trunkSway, height * 0.38, 55, 0, Math.PI * 2);
        ctx.arc(40 + trunkSway, height * 0.38, 50, 0, Math.PI * 2);
        ctx.fill();

        // Draw apples (red fruits with stems & highlights)
        const appleCoords = [
          { x: 75, y: height * 0.42 },
          { x: 125, y: height * 0.39 },
          { x: 45, y: height * 0.39 },
          { x: 95, y: height * 0.36 },
        ];
        appleCoords.forEach(apple => {
          // stem
          ctx.strokeStyle = '#451a03';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(apple.x + trunkSway, apple.y);
          ctx.quadraticCurveTo(apple.x + trunkSway + 2, apple.y - 7, apple.x + trunkSway + 5, apple.y - 6);
          ctx.stroke();

          // apple body
          ctx.fillStyle = '#dc2626';
          ctx.beginPath();
          ctx.arc(apple.x + trunkSway, apple.y, 7, 0, Math.PI * 2);
          ctx.fill();

          // apple highlight dot
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(apple.x + trunkSway - 2, apple.y - 2, 1.8, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw Right Tree
        const rTrunkSway = Math.cos(t * 0.013) * 3;
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.moveTo(width - 60, height);
        ctx.quadraticCurveTo(width - 80, height * 0.7, width - 100 + rTrunkSway, height * 0.5);
        ctx.lineTo(width - 70 + rTrunkSway, height * 0.5);
        ctx.quadraticCurveTo(width - 50, height * 0.7, width - 20, height);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(width - 45, height);
        ctx.quadraticCurveTo(width - 65, height * 0.7, width - 85 + rTrunkSway, height * 0.5);
        ctx.stroke();

        ctx.fillStyle = '#166534';
        ctx.beginPath();
        ctx.arc(width - 90 + rTrunkSway, height * 0.48, 60, 0, Math.PI * 2);
        ctx.arc(width - 130 + rTrunkSway, height * 0.45, 50, 0, Math.PI * 2);
        ctx.arc(width - 50 + rTrunkSway, height * 0.44, 45, 0, Math.PI * 2);
        ctx.fill();

        // Yellow fruits with stems and highlights
        const yellowFruits = [
          { x: width - 90, y: height * 0.48 },
          { x: width - 120, y: height * 0.46 },
          { x: width - 60, y: height * 0.44 },
        ];
        yellowFruits.forEach(fruit => {
          ctx.strokeStyle = '#451a03';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(fruit.x + rTrunkSway, fruit.y);
          ctx.quadraticCurveTo(fruit.x + rTrunkSway + 2, fruit.y - 7, fruit.x + rTrunkSway + 5, fruit.y - 6);
          ctx.stroke();

          ctx.fillStyle = '#eab308';
          ctx.beginPath();
          ctx.arc(fruit.x + rTrunkSway, fruit.y, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(fruit.x + rTrunkSway - 2, fruit.y - 2, 1.8, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (activeId === 'nuh') {
        // NUH DELUGE (Stormy Ocean, rocking Ark, rain drops, waves foam)
        drawSky('#0f172a', '#1e293b', '#0f172a'); // dark navy-slate sky

        // Lightning flashes
        if (Math.random() < 0.009) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.fillRect(0, 0, width, height);
        }

        // Overlapping swell waves with foam lines
        const w2 = height * 0.72 + Math.cos(t * 0.015) * 18;

        drawHill(height * 0.65, 'rgba(30, 58, 138, 0.5)', 20, 0.005, t * 0.02, true);
        drawHill(height * 0.72, 'rgba(23, 37, 84, 0.7)', 25, 0.006, -t * 0.015, true);

        // Rocking wooden Ark ship silhouette
        ctx.save();
        const shipX = width * 0.5;
        const shipY = w2 - 25;
        const shipRock = Math.sin(t * 0.025) * 0.07; // rocking angle
        ctx.translate(shipX, shipY);
        ctx.rotate(shipRock);

        // Draw Ark hull with wood planks detailing
        ctx.fillStyle = '#451a03'; // deep wood brown
        ctx.beginPath();
        ctx.moveTo(-70, -10);
        ctx.lineTo(-90, -30);
        ctx.lineTo(90, -30);
        ctx.lineTo(70, -10);
        ctx.quadraticCurveTo(0, 15, -70, -10);
        ctx.closePath();
        ctx.fill();

        // Hull lines detail
        ctx.strokeStyle = '#270e02';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-75, -17); ctx.lineTo(75, -17);
        ctx.moveTo(-70, -24); ctx.lineTo(70, -24);
        ctx.stroke();

        // Draw Cabin
        ctx.fillStyle = '#78350f';
        ctx.fillRect(-40, -50, 80, 20);
        ctx.fillStyle = '#f59e0b'; // glowing small cabin window
        ctx.fillRect(-15, -42, 10, 8);
        ctx.fillRect(5, -42, 10, 8);

        // Waving Flag
        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.moveTo(0, -50);
        ctx.lineTo(15 + Math.sin(t * 0.15) * 4, -45);
        ctx.lineTo(0, -40);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // Draw front wave layer
        drawHill(height * 0.8, '#172554', 30, 0.004, t * 0.01, true);

      } else if (activeId === 'ibrahim') {
        // IBRAHIM FLAMES & GARDEN (Detailed roses blooming in flame sanctuary)
        drawSky('#1a0505', '#2d0a0a', '#1f0707');

        // Draw Nimrod's temple ruins in far background
        ctx.fillStyle = 'rgba(239, 68, 68, 0.03)';
        ctx.fillRect(width * 0.1, height * 0.4, 200, height * 0.3);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.04)';
        ctx.beginPath();
        ctx.moveTo(width * 0.1, height * 0.7);
        ctx.lineTo(width * 0.2, height * 0.45);
        ctx.lineTo(width * 0.3, height * 0.7);
        ctx.closePath();
        ctx.fill();

        // Render central green sanctuary garden patch
        ctx.fillStyle = '#14532d'; // dark forest green patch
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.8, 180, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#15803d'; // inner grass green
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.8, 140, 0, Math.PI * 2);
        ctx.fill();

        // Draw a green rose bush structure with detailed stems and leaves
        ctx.strokeStyle = '#166534';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(width * 0.5, height * 0.8);
        ctx.quadraticCurveTo(width * 0.48, height * 0.68, width * 0.46, height * 0.64);
        ctx.moveTo(width * 0.5, height * 0.8);
        ctx.quadraticCurveTo(width * 0.52, height * 0.69, width * 0.54, height * 0.65);
        ctx.stroke();

        // Draw thorn marks on rose bush
        ctx.strokeStyle = '#14532d';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(width * 0.47, height * 0.66); ctx.lineTo(width * 0.46, height * 0.67);
        ctx.moveTo(width * 0.53, height * 0.67); ctx.lineTo(width * 0.54, height * 0.68);
        ctx.stroke();

        // Draw roses with multi-layered petal depths
        const roses = [
          { x: width * 0.46, y: height * 0.63, size: 14 },
          { x: width * 0.54, y: height * 0.64, size: 12 },
          { x: width * 0.49, y: height * 0.67, size: 10 },
        ];
        roses.forEach(r => {
          ctx.fillStyle = '#f43f5e'; // main rose
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.size, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#e11d48'; // inner rose detail
          ctx.beginPath();
          ctx.arc(r.x - 2, r.y - 2, r.size * 0.6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#be123c'; // core rose detail
          ctx.beginPath();
          ctx.arc(r.x + 1, r.y + 1, r.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw flickering fire flares on borders
        const fireGrad = ctx.createLinearGradient(0, height, 0, 0);
        fireGrad.addColorStop(0, 'rgba(239, 68, 68, 0.85)'); // bright red
        fireGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.7)'); // orange
        fireGrad.addColorStop(1, 'rgba(253, 224, 71, 0)'); // yellow fade

        ctx.fillStyle = fireGrad;
        // Left Flame Wall
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let y = height; y >= 0; y -= 15) {
          const x = 80 + Math.sin(y * 0.02 + t * 0.09) * 25;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();

        // Right Flame Wall
        ctx.beginPath();
        ctx.moveTo(width, height);
        for (let y = height; y >= 0; y -= 15) {
          const x = width - (80 + Math.cos(y * 0.02 + t * 0.09) * 25);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, 0);
        ctx.closePath();
        ctx.fill();

      } else if (activeId === 'yusuf') {
        // YUSUF 3D PYRAMIDS & COLUMNS DETAILED CARVINGS
        drawSky('#fb923c', '#fdba74', '#fed7aa'); // desert sand sunset gradient

        // Far 3D Pyramids (using lighting highlights and shadow sides)
        const pyramids = [
          { apexX: width * 0.25, apexY: height * 0.45, leftX: width * 0.1, rightX: width * 0.4, baseLine: height * 0.72 },
          { apexX: width * 0.42, apexY: height * 0.52, leftX: width * 0.32, rightX: width * 0.52, baseLine: height * 0.72 },
        ];

        pyramids.forEach(py => {
          // Highlight Side (facing west sunset)
          ctx.fillStyle = '#f97316';
          ctx.beginPath();
          ctx.moveTo(py.apexX, py.apexY);
          ctx.lineTo(py.leftX, py.baseLine);
          ctx.lineTo(py.apexX, py.baseLine);
          ctx.closePath();
          ctx.fill();

          // Shadow Side
          ctx.fillStyle = '#c2410c';
          ctx.beginPath();
          ctx.moveTo(py.apexX, py.apexY);
          ctx.lineTo(py.rightX, py.baseLine);
          ctx.lineTo(py.apexX, py.baseLine);
          ctx.closePath();
          ctx.fill();
        });

        // Smooth flowing desert dunes (waves)
        drawHill(height * 0.74, '#ea580c', 16, 0.002, t * 0.0006);
        drawHill(height * 0.82, '#c2410c', 10, 0.001, -t * 0.0005);

        // Sandstone palace columns with Hieroglyphic carvings
        ctx.fillStyle = '#b45309'; // column bronze
        // Left Column
        ctx.fillRect(0, 0, 45, height);
        ctx.fillStyle = '#92400e'; // column shadow lines
        ctx.fillRect(45, 0, 10, height);

        // Carved Rings & hieroglyphics lines on Left column
        ctx.strokeStyle = 'rgba(69, 26, 3, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height * 0.2); ctx.lineTo(45, height * 0.2);
        ctx.moveTo(0, height * 0.4); ctx.lineTo(45, height * 0.4);
        ctx.moveTo(0, height * 0.6); ctx.lineTo(45, height * 0.6);
        // Symbol details
        ctx.moveTo(15, height * 0.28); ctx.lineTo(30, height * 0.32); ctx.lineTo(15, height * 0.36);
        ctx.stroke();

        // Right Column
        ctx.fillStyle = '#b45309';
        ctx.fillRect(width - 45, 0, 45, height);
        ctx.fillStyle = '#92400e';
        ctx.fillRect(width - 55, 0, 10, height);

        // Carved Rings & hieroglyphics lines on Right column
        ctx.beginPath();
        ctx.moveTo(width - 45, height * 0.2); ctx.lineTo(width, height * 0.2);
        ctx.moveTo(width - 45, height * 0.4); ctx.lineTo(width, height * 0.4);
        ctx.moveTo(width - 45, height * 0.6); ctx.lineTo(width, height * 0.6);
        // Symbol details
        ctx.moveTo(width - 30, height * 0.48); ctx.lineTo(width - 15, height * 0.52); ctx.lineTo(width - 30, height * 0.56);
        ctx.stroke();

      } else if (activeId === 'musa') {
        // MUSA SPLITTING SEA WALLS & SWIMMING FISH SILHOUETTES
        drawSky('#1e1b4b', '#312e81', '#1e1b4b'); // deep purple-blue sky

        // Mt. Sinai rock shape with geological cracks
        ctx.fillStyle = '#0f0e17';
        ctx.beginPath();
        ctx.moveTo(width * 0.35, height * 0.75);
        ctx.lineTo(width * 0.5, height * 0.38);
        ctx.lineTo(width * 0.65, height * 0.75);
        ctx.closePath();
        ctx.fill();

        // Sinai cracks
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(width * 0.5, height * 0.38); ctx.lineTo(width * 0.48, height * 0.55);
        ctx.moveTo(width * 0.5, height * 0.38); ctx.lineTo(width * 0.53, height * 0.62);
        ctx.stroke();

        // Left split sea wall
        ctx.fillStyle = 'rgba(8, 145, 178, 0.8)'; // cyan water
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(width * 0.3, height);
        ctx.quadraticCurveTo(width * 0.32 + Math.sin(t * 0.02) * 12, height * 0.5, width * 0.1, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();

        // Right split sea wall
        ctx.fillStyle = 'rgba(6, 182, 212, 0.8)';
        ctx.beginPath();
        ctx.moveTo(width, height);
        ctx.lineTo(width * 0.7, height);
        ctx.quadraticCurveTo(width * 0.68 - Math.sin(t * 0.02) * 12, height * 0.5, width * 0.9, 0);
        ctx.lineTo(width, 0);
        ctx.closePath();
        ctx.fill();

        // Intricate Detail: Swimming Fish Silhouettes in sea walls
        ctx.fillStyle = 'rgba(15, 23, 42, 0.3)'; // dark translucent fish silhouette
        
        // Fish 1 (Left wall)
        const fishY1 = height * 0.45 + Math.sin(t * 0.01) * 20;
        const fishX1 = width * 0.15 + Math.cos(t * 0.01) * 15;
        ctx.beginPath();
        ctx.ellipse(fishX1, fishY1, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(fishX1 - 12, fishY1);
        ctx.lineTo(fishX1 - 19, fishY1 - 5);
        ctx.lineTo(fishX1 - 19, fishY1 + 5);
        ctx.closePath();
        ctx.fill();

        // Fish 2 (Right wall)
        const fishY2 = height * 0.35 + Math.cos(t * 0.012) * 25;
        const fishX2 = width * 0.82 + Math.sin(t * 0.012) * 10;
        ctx.beginPath();
        ctx.ellipse(fishX2, fishY2, 10, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(fishX2 - 10, fishY2);
        ctx.lineTo(fishX2 - 16, fishY2 - 4);
        ctx.lineTo(fishX2 - 16, fishY2 + 4);
        ctx.closePath();
        ctx.fill();

        // Sandy pathway leading forward
        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.moveTo(width * 0.3, height);
        ctx.lineTo(width * 0.7, height);
        ctx.lineTo(width * 0.5, height * 0.74);
        ctx.closePath();
        ctx.fill();

      } else if (activeId === 'yunus') {
        // YUNUS BELLY OF THE WHALE & FLOATING PLANKTONS
        drawSky('#030712', '#020617', '#030712'); // oceanic deep dark

        // Translucent ribs cage outline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 14;
        for (let i = 0.1; i < 0.9; i += 0.15) {
          ctx.beginPath();
          ctx.ellipse(width * i, height * 0.45, 60, height * 0.38, 0, 0, Math.PI, true);
          ctx.stroke();
        }

        // Ocean bioluminescent current rays
        const bioGrad = ctx.createLinearGradient(0, height, width, 0);
        bioGrad.addColorStop(0, 'rgba(45, 212, 191, 0.01)');
        bioGrad.addColorStop(0.5, 'rgba(20, 184, 166, 0.08)');
        bioGrad.addColorStop(1, 'rgba(13, 148, 136, 0.01)');
        ctx.fillStyle = bioGrad;
        ctx.fillRect(0, 0, width, height);

      } else if (activeId === 'isa') {
        // ISA JUDEAN GREEN HILLS & STONE ARCH
        drawSky('#bae6fd', '#38bdf8', '#0284c7'); // Judean blue skies

        // Sunbeams rotate
        ctx.save();
        ctx.translate(width * 0.1, height * 0.2);
        ctx.rotate(t * 0.001);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(2500, -200 + i * 80);
          ctx.lineTo(2500, 200 + i * 80);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // Judean hills
        drawHill(height * 0.7, '#65a30d', 14, 0.002, t * 0.0004);
        drawHill(height * 0.78, '#4f7a07', 10, 0.001, -t * 0.0003);

        // Stone archway silhouette on left with mortared stone lines detailing
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, height * 0.4, 60, height * 0.6);
        ctx.beginPath();
        ctx.arc(60, height * 0.58, 80, Math.PI * 1.5, Math.PI * 2);
        ctx.lineTo(60, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();

        // Mortar brick cracks lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, height * 0.5); ctx.lineTo(60, height * 0.5);
        ctx.moveTo(0, height * 0.7); ctx.lineTo(60, height * 0.7);
        ctx.moveTo(30, height * 0.4); ctx.lineTo(30, height * 0.5);
        ctx.stroke();

      } else {
        // MUHAMMAD CAVE OF HIRA & MOUNT NOOR (Shooting stars)
        drawSky('#030712', '#090d16', '#030712'); // deep indigo cosmos

        // Intricate Detail: Periodic Shooting Star streaks
        const starCycle = t % 320;
        if (starCycle < 60) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          const startX = width * 0.15 + starCycle * 4.5;
          const startY = height * 0.08 + starCycle * 1.6;
          ctx.moveTo(startX, startY);
          ctx.lineTo(startX + 28, startY + 10);
          ctx.stroke();
        }

        // Crescent Moon
        ctx.beginPath();
        ctx.arc(width * 0.8, height * 0.25, 25, 0, Math.PI * 2);
        ctx.fillStyle = '#fef08a';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(width * 0.79, height * 0.24, 25, 0, Math.PI * 2);
        ctx.fillStyle = '#030712'; // subtract circle to make crescent
        ctx.fill();

        // Mount Noor outline
        ctx.fillStyle = '#020617';
        ctx.beginPath();
        ctx.moveTo(width * 0.2, height);
        ctx.lineTo(width * 0.5, height * 0.42);
        ctx.lineTo(width * 0.8, height);
        ctx.closePath();
        ctx.fill();

        // Cave opening glowing pulse aura
        const pulse = 25 + Math.sin(t * 0.035) * 8;
        const caveGrad = ctx.createRadialGradient(width * 0.5, height * 0.64, 2, width * 0.5, height * 0.64, pulse);
        caveGrad.addColorStop(0, '#fef08a');
        caveGrad.addColorStop(0.4, '#f59e0b');
        caveGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.64, pulse, 0, Math.PI * 2);
        ctx.fillStyle = caveGrad;
        ctx.fill();
      }

      // 3. LAYERED PARTICLE PHYSICS OVERLAY (Rain, leaves, embers, etc.)
      particlesRef.current.forEach(p => {
        if (activeStep.particles === 'rain') {
          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y > height) { p.y = -10; p.x = Math.random() * width; }
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
          ctx.lineWidth = p.size * 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX, p.y + p.speedY);
          ctx.stroke();
        } else if (activeStep.particles === 'embers') {
          p.y -= p.speedY * 0.8;
          p.x += Math.sin(t * 0.02 + p.y * 0.01) * 0.6;
          if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
          ctx.fillStyle = `rgba(249, 115, 22, ${p.alpha})`; // orange ember
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (activeStep.particles === 'gold-sand') {
          p.x -= p.speedY * 1.2;
          p.y += Math.sin(t * 0.015 + p.x * 0.005) * 0.3;
          if (p.x < -10) { p.x = width + 10; p.y = Math.random() * height; }
          ctx.fillStyle = `rgba(234, 179, 8, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (activeStep.particles === 'ocean-glow') {
          p.y -= p.speedY * 0.3;
          if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
          ctx.fillStyle = `rgba(45, 212, 191, ${p.alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (activeStep.particles === 'stars') {
          p.alpha += Math.sin(t * 0.05 + p.x) * 0.04;
          if (p.alpha > 0.95) p.alpha = 0.95;
          if (p.alpha < 0.15) p.alpha = 0.15;
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
          ctx.fill();
        } else if (activeStep.particles === 'mist') {
          p.x += p.speedX * 0.4;
          if (p.x > width + 50) p.x = -50;
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.15})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 18, 0, Math.PI * 2);
          ctx.fill();
        } else {
          p.y += p.speedY * 0.3;
          p.x += Math.sin(t * 0.02) * 0.5 - 1.2;
          if (p.x < -10 || p.y > height) { p.x = width + 10; p.y = Math.random() * height; }
          ctx.fillStyle = `rgba(21, 128, 61, ${p.alpha})`; // green leaf
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, activeStepIndex]);

  const handleNextStep = () => {
    if (activeStepIndex < 2) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-50 select-none">
      
      {/* Immersive background drawing canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />

      {/* FLOATING HUD INTERFACE OVERLAYS */}

      {/* HUD Header Bar */}
      <header className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 z-20 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-[1px] no-print">
        
        {/* Brand Label */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors border border-white/5"
            title="Exit Chronicles"
          >
            <X className="h-4.5 w-4.5" />
          </button>
          <div className="text-left">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider block">
              Chronicles
            </span>
            <h2 className="text-sm font-bold text-white font-cinzel tracking-wide leading-none">
              {activeProfile.name}
            </h2>
          </div>
        </div>

        {/* HUD controls (sound synth toggle, exit button) */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={playAmbientSound}
            className={`h-9 px-4 rounded-xl text-[10px] font-bold font-display uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border border-white/10 transition-all ${
              isPlayingSound
                ? 'bg-emerald-500 text-white border-emerald-500 animate-pulse'
                : 'bg-black/30 text-slate-300 hover:bg-black/40 hover:text-white'
            }`}
          >
            {isPlayingSound ? (
              <>
                <Volume2 className="h-4 w-4" />
                <span>Sound On</span>
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4" />
                <span>Muted</span>
              </>
            )}
          </button>

          {/* Close button */}
          <button
            onClick={onExit}
            className="h-9 px-4 rounded-xl text-[10px] font-bold font-display uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors border border-white/5"
          >
            Exit Theater
          </button>
        </div>
      </header>

      {/* Floating Left Dock: Prophets Navigation (circular selector bubbles) */}
      <nav className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 no-print bg-black/25 backdrop-blur-xs p-2 rounded-3xl border border-white/5">
        {PROPHETS_DATA.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              onClick={() => {
                setActiveId(p.id);
                setActiveStepIndex(0);
              }}
              className={`h-11 w-11 rounded-full flex items-center justify-center text-lg cursor-pointer transition-all duration-300 relative group shadow-sm border ${
                isActive
                  ? 'bg-gold-500 border-gold-500 text-slate-950 scale-110 shadow-gold-500/20'
                  : 'bg-black/45 border-white/5 text-slate-400 hover:text-white hover:border-white/10 hover:scale-105'
              }`}
              title={p.name}
            >
              <span>{p.emoji}</span>
              
              {/* Tooltip on hover */}
              <span className="absolute left-14 scale-0 group-hover:scale-100 px-2.5 py-1 text-[9px] font-bold font-display uppercase tracking-wider bg-slate-900 border border-slate-800 text-white rounded-md transition-all duration-150 z-30 whitespace-nowrap leading-none shadow-md">
                {p.name.replace('Prophet ', '')}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Floating Bottom Subtitle Deck */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-20 no-print flex flex-col items-center gap-3">
        
        {/* Step dots stepper indicator */}
        <div className="flex gap-2">
          {[0, 1, 2].map((idx) => {
            const isSel = idx === activeStepIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isSel ? 'w-6 bg-gold-500 shadow-sm shadow-gold-500/30' : 'w-1.5 bg-white/35 hover:bg-white/50'
                }`}
              />
            );
          })}
        </div>

        {/* Main story description display card */}
        <div className="w-full glass-dark backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-4.5 flex items-center justify-between gap-4 shadow-xl">
          
          {/* Back Step Arrow */}
          <button
            onClick={handlePrevStep}
            disabled={activeStepIndex === 0}
            className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white flex items-center justify-center cursor-pointer transition-colors border border-white/5 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Subtitle Caption */}
          <div className="flex-1 text-center space-y-1 select-text">
            <span className="text-[9px] font-bold font-display uppercase tracking-widest text-gold-400">
              {activeStep.subtitle}
            </span>
            <h3 className="text-sm font-bold text-white leading-tight">
              {activeStep.title}
            </h3>
            <p className="text-xs text-slate-200/90 leading-relaxed font-sans font-medium px-4 max-h-[80px] overflow-y-auto no-scrollbar">
              {activeStep.narrative}
            </p>
          </div>

          {/* Next Step Arrow */}
          <button
            onClick={handleNextStep}
            disabled={activeStepIndex === 2}
            className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white flex items-center justify-center cursor-pointer transition-colors border border-white/5 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </footer>

      {/* Floating Right Side Tab: Scriptures Trigger Button */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 no-print">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="px-3.5 py-4 rounded-l-2xl bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold font-display uppercase tracking-wider text-[10px] flex flex-col items-center gap-1.5 cursor-pointer shadow-lg transition-colors border-l border-y border-gold-500/20"
        >
          <BookOpen className="h-4.5 w-4.5 text-slate-950" />
          <span className="writing-vertical tracking-widest pt-1">Scriptures</span>
          <span className="h-4.5 min-w-4.5 px-1 rounded-full bg-slate-950 text-gold-400 flex items-center justify-center text-[9px] font-bold font-sans">
            {scriptures.length}
          </span>
        </button>
      </div>

      {/* Sliding Frosted Drawer from Right Side (Scriptures list) */}
      <div className={`fixed right-0 top-0 bottom-0 w-full sm:w-[420px] z-50 bg-black/60 backdrop-blur-xl border-l border-white/10 shadow-2xl transition-all duration-300 transform flex flex-col no-print ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Drawer Header */}
        <div className="h-16 border-b border-white/10 px-5 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-2 text-left">
            <BookOpen className="h-4 w-4 text-gold-500" />
            <h4 className="text-[10px] font-bold font-display uppercase tracking-wider text-slate-300">
              Stage Quranic References ({scriptures.length})
            </h4>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-white/5"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 select-text scrollbar-thin">
          {scriptures.length > 0 ? (
            scriptures.map(entry => (
              <ResultCard
                key={entry.id}
                entry={entry}
                searchQuery=""
                exactPhrase={false}
                isBookmarked={bookmarks.includes(entry.id)}
                onToggleBookmark={onToggleBookmark}
                onReadContext={(doc) => {
                  onReadContext(doc);
                }}
              />
            ))
          ) : (
            <div className="flex items-center justify-center py-24 text-slate-400 text-xs font-semibold">
              <span>Loading stage scriptures from index...</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
