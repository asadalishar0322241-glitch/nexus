/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Users, Video, Briefcase, Sparkles, Building2 } from 'lucide-react';

export interface Scene {
  id: string;
  title: string;
  category: 'office' | 'meeting';
  tag: string;
  location: string;
  description: string;
  imageUrl: string;
  alt: string;
  participants: string;
}

const SCENES: Scene[] = [
  {
    id: 'office-studio',
    title: 'London Growth Studio',
    category: 'office',
    tag: 'Real Team In Studio',
    location: 'London Hub · St Mary Axe',
    description: 'Senior digital marketing practitioners and creative directors working synchronously across paid media attribution and CRO architecture.',
    imageUrl: '/src/assets/images/human_agency_office_team_1793895404430.jpg',
    alt: 'Real Nexus senior digital marketing team collaborating in modern London agency office studio',
    participants: 'Elena Rostova, Marcus Vance & Senior Growth Pod',
  },
  {
    id: 'client-meeting',
    title: 'Executive Client Boardroom',
    category: 'meeting',
    tag: 'Active Client Meeting',
    location: 'New York Boardroom · One World Trade',
    description: 'Senior Practice Directors presenting quarterly commercial revenue expansion and multi-channel ROAS metrics to enterprise leadership.',
    imageUrl: '/src/assets/images/executive_client_meeting_1793895404256.jpg',
    alt: 'Real senior marketing directors presenting live growth charts to enterprise clients in boardroom meeting',
    participants: 'Julian Thorne presenting to Enterprise Executive Board',
  },
  {
    id: 'war-room',
    title: 'Conversion War Room',
    category: 'office',
    tag: 'Funnel Sprint Session',
    location: 'Dubai Digital Lab · DIFC Gate',
    description: 'Real-time campaign sprint mapping, full-funnel CRO diagnostics, and cross-channel attribution modeling.',
    imageUrl: '/src/assets/images/growth_war_room_sprint_1793895404805.jpg',
    alt: 'Marketing growth team in modern strategy war room analyzing conversion funnels and live campaign charts',
    participants: 'Chloe Chen & Full-Funnel CRO Specialists',
  },
  {
    id: 'partner-consult',
    title: 'Senior Partner Advisory',
    category: 'meeting',
    tag: '1-on-1 Consultation',
    location: 'Private Client Suite · Hybrid Room',
    description: 'Direct diagnostic evaluation of client unit economics, CAC thresholds, and programmatic search opportunity.',
    imageUrl: '/src/assets/images/senior_client_consultation_1793895405341.jpg',
    alt: 'Senior marketing director explaining paid media analytics on tablet to client during strategic consultation',
    participants: 'Senior Advisory Director with Scale-up Founder',
  },
];

interface AgencyOfficeMeetingShowcaseProps {
  className?: string;
  compact?: boolean;
}

export const AgencyOfficeMeetingShowcase: React.FC<AgencyOfficeMeetingShowcaseProps> = ({
  className = '',
  compact = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeScene = SCENES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SCENES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SCENES.length) % SCENES.length);
    setProgress(0);
  };

  const handleSelectScene = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const intervalTime = 50;
    const totalDuration = 5500;
    const step = (intervalTime / totalDuration) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % SCENES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, currentIndex]);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-950 group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Agency Office and Client Meeting Showcase"
    >
      {/* Visual Canvas with Smooth Cross-Fade and Ken Burns Zoom */}
      <div className={`relative w-full ${compact ? 'h-[360px] sm:h-[420px]' : 'h-[440px] sm:h-[520px]'} overflow-hidden`}>
        {SCENES.map((scene, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={scene.imageUrl}
                alt={scene.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transform transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
              {/* Cinematic Vignette & Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/40 pointer-events-none" />
            </div>
          );
        })}

        {/* Top Progress Bar for Auto-Slide Animation */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top Header Controls: Mode Toggles & Auto-Play Status */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between gap-2">
          {/* Quick Scene Buttons (Office vs Meeting) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 backdrop-blur-md rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => handleSelectScene(0)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                currentIndex === 0
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Office Studio</span>
            </button>
            <button
              onClick={() => handleSelectScene(1)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                currentIndex === 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Client Meeting</span>
            </button>
            <button
              onClick={() => handleSelectScene(2)}
              className={`hidden md:flex px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all items-center gap-1.5 ${
                currentIndex === 2
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>War Room</span>
            </button>
            <button
              onClick={() => handleSelectScene(3)}
              className={`hidden lg:flex px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all items-center gap-1.5 ${
                currentIndex === 3
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Advisory Suite</span>
            </button>
          </div>

          {/* Play/Pause & Live Active Indicator */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Operations</span>
            </span>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label={isPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Arrow Navigation (Previous / Next) */}
        <div className="absolute inset-y-0 left-2 right-2 z-20 flex items-center justify-between pointer-events-none">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-slate-950/60 hover:bg-slate-900/90 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all pointer-events-auto transform -translate-x-1 group-hover:translate-x-0 opacity-80 hover:opacity-100 hover:scale-105"
            aria-label="Previous scene"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-slate-950/60 hover:bg-slate-900/90 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all pointer-events-auto transform translate-x-1 group-hover:translate-x-0 opacity-80 hover:opacity-100 hover:scale-105"
            aria-label="Next scene"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Information Card Overlay */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3.5 sm:p-4 text-white shadow-xl space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded">
                  {activeScene.tag}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {activeScene.location}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                <Users className="w-3 h-3 text-blue-400" />
                <span className="truncate max-w-[200px] sm:max-w-xs">{activeScene.participants}</span>
              </div>
            </div>

            <div className="text-xs sm:text-sm font-semibold text-white">
              {activeScene.title}
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {activeScene.description}
            </p>

            {/* Slide Progress Dots / Indicators */}
            <div className="pt-1 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {SCENES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectScene(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-6 bg-blue-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to scene ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-mono ml-auto">
                0{currentIndex + 1} / 0{SCENES.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
