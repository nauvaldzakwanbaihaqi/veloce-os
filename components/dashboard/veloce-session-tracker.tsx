"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function VeloceSessionTracker() {
  const [seconds, setSeconds] = useState(9320); // starts around 02:35:20
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  // Calculate percentage of an 8-hour shift for circular gauge ring
  const progressPercent = Math.min(100, Math.round((seconds / (8 * 3600)) * 100));
  const strokeDashoffset = 283 - (283 * progressPercent) / 100;

  return (
    <Card className="rounded-3xl border-0 shadow-sm shadow-blue-900/5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 flex flex-col justify-between h-full min-h-[220px]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Clock className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Session Tracker</h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Uptime & Real-time Daemon
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/80 text-[10px] font-mono font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </div>
      </div>

      {/* Center Circular Timer */}
      <div className="py-2 flex items-center justify-center gap-6">
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* SVG Circular Ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-slate-100 dark:text-slate-800"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-blue-600 dark:text-blue-500 transition-all duration-500"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Center Digital Time */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
              {formattedTime}
            </span>
            <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">
              Uptime
            </span>
          </div>
        </div>

        {/* Controls & Session Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className={cn(
                "p-2.5 rounded-full font-medium text-xs flex items-center justify-center transition-all duration-200 shadow-sm",
                isRunning
                  ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
              aria-label={isRunning ? "Pause timer" : "Start timer"}
            >
              {isRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
            </button>

            <button
              type="button"
              onClick={() => setSeconds(0)}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Reset timer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 space-y-0.5">
            <div>Target: 08:00:00</div>
            <div>Shift: {progressPercent}% done</div>
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <span>State: <strong className={isRunning ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500"}>{isRunning ? "Recording" : "Paused"}</strong></span>
        <span>Idle: <strong>0%</strong></span>
      </div>
    </Card>
  );
}
