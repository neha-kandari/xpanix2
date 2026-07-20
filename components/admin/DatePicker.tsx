"use client";
import { useEffect, useRef, useState } from "react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function formatDate(d: Date): string {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function parseDate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function DatePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = parseDate(value);
  const today = new Date();
  const [viewDate, setViewDate] = useState(selected ?? today);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  function openPicker() {
    setViewDate(selected ?? today);
    setOpen((o) => !o);
  }

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function selectDay(day: number) {
    onChange(formatDate(new Date(year, month, day)));
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={openPicker}
        className="w-full flex items-center justify-between gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131320] px-3 py-2 text-sm text-left outline-none focus:ring-2 focus:ring-[#764ba2]/50 hover:border-[#764ba2]/60 transition-colors"
      >
        <span className={value ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}>
          {value || "Select date"}
        </span>
        <svg className="w-4 h-4 flex-shrink-0 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M5.25 5.25h13.5A1.5 1.5 0 0 1 20.25 6.75v12A1.5 1.5 0 0 1 18.75 20.25H5.25A1.5 1.5 0 0 1 3.75 18.75v-12A1.5 1.5 0 0 1 5.25 5.25Z" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-72 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131320] shadow-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#764ba2] dark:hover:text-[#667eea] transition-colors"
              aria-label="Previous month"
            >
              ‹
            </button>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#764ba2] dark:hover:text-[#667eea] transition-colors"
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-1 mb-1">
            {WEEKDAYS.map((w, i) => (
              <div key={i} className="text-center text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-600">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;
              const cellDate = new Date(year, month, day);
              const isSelected = selected && isSameDay(cellDate, selected);
              const isToday = isSameDay(cellDate, today);
              return (
                <div key={i} className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => selectDay(day)}
                    className={`h-8 w-8 rounded-full text-xs flex items-center justify-center transition-colors ${
                      isSelected
                        ? "gradient-bg text-white font-bold shadow-md shadow-[#764ba2]/30"
                        : isToday
                        ? "border border-[#764ba2] text-[#764ba2] dark:text-[#667eea] font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              onChange(formatDate(today));
              setOpen(false);
            }}
            className="mt-3 w-full text-xs font-semibold text-[#764ba2] dark:text-[#667eea] hover:underline"
          >
            Today
          </button>
        </div>
      )}
    </div>
  );
}
