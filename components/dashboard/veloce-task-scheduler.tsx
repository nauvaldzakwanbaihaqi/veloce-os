"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function VeloceTaskScheduler() {
  const [selectedDay, setSelectedDay] = useState("Wed");

  const weekDays = [
    { day: "Mon", date: "12", isToday: false, tasks: 2 },
    { day: "Tue", date: "13", isToday: false, tasks: 4 },
    { day: "Wed", date: "14", isToday: true, tasks: 5 },
    { day: "Thu", date: "15", isToday: false, tasks: 1 },
    { day: "Fri", date: "16", isToday: false, tasks: 3 },
    { day: "Sat", date: "17", isToday: false, tasks: 0 },
    { day: "Sun", date: "18", isToday: false, tasks: 1 },
  ];

  const scheduledTasks = [
    {
      id: "t1",
      time: "09:00 AM",
      title: "Postgres Snapshot & WAL Archiving",
      category: "Cron Daemon",
      status: "SUCCESS",
      duration: "1.2s",
      badge: "System",
    },
    {
      id: "t2",
      time: "11:30 AM",
      title: "Invoice Due Date & WhatsApp Reminder Dispatch",
      category: "Billing Service",
      status: "SUCCESS",
      duration: "450ms",
      badge: "Finance",
    },
    {
      id: "t3",
      time: "02:15 PM",
      title: "Zod Schema & Audit Logs Verification",
      category: "Security",
      status: "IN_PROGRESS",
      duration: "Running",
      badge: "Security",
    },
    {
      id: "t4",
      time: "06:00 PM",
      title: "Client CRM Index & Analytics Aggregation",
      category: "Analytics",
      status: "PENDING",
      duration: "Scheduled",
      badge: "CRM",
    },
  ];

  return (
    <Card className="rounded-3xl border-0 shadow-sm shadow-blue-900/5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              System Logs & Task Scheduler
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Automated Daemons, Cron Schedules & Background Pipelines
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 border-0 font-mono text-xs">
            August 2026
          </Badge>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Previous week"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Next week"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Week Calendar Day Strip */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((d) => {
          const isSelected = selectedDay === d.day;
          return (
            <button
              key={d.day}
              type="button"
              onClick={() => setSelectedDay(d.day)}
              className={cn(
                "p-3 rounded-2xl flex flex-col items-center justify-between gap-1 transition-all duration-200 border",
                isSelected
                  ? "bg-slate-900 text-white dark:bg-blue-600 dark:text-white border-transparent shadow-md"
                  : d.isToday
                  ? "bg-blue-50/80 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200 border-blue-200 dark:border-blue-800"
                  : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800"
              )}
            >
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold opacity-75">
                {d.day}
              </span>
              <span className="text-base font-extrabold font-mono leading-none">
                {d.date}
              </span>
              <div className="flex gap-1 items-center h-1.5 mt-0.5">
                {d.tasks > 0 ? (
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isSelected
                        ? "bg-blue-400 dark:bg-white"
                        : "bg-blue-600 dark:bg-blue-400"
                    )}
                  />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 opacity-50" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Scheduled Task Items List */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-1 font-mono">
          <span>Active Pipeline Schedule · {selectedDay}, Aug 2026</span>
          <span className="text-blue-600 dark:text-blue-400">4 tasks queued</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scheduledTasks.map((task) => (
            <div
              key={task.id}
              className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-700 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-blue-500" />
                  {task.time}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded-full border font-semibold",
                    task.status === "SUCCESS"
                      ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                      : task.status === "IN_PROGRESS"
                      ? "text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800 animate-pulse"
                      : "text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  )}
                >
                  {task.status}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {task.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                  <span>Category: {task.category}</span>
                  <span>Latency: {task.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
