"use client";
import { useRef, useState } from "react";

export default function ImageUploader({
  value,
  onChange,
  onUploadFile,
  uploading,
  error,
}: {
  value: string;
  onChange: (url: string) => void;
  onUploadFile: (file: File) => void;
  uploading: boolean;
  error: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) onUploadFile(file);
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`group relative overflow-hidden rounded-xl border-2 border-dashed cursor-pointer transition-colors w-40 h-28 ${
          dragging
            ? "border-[#764ba2] bg-[#764ba2]/5"
            : "border-gray-300 dark:border-gray-700 hover:border-[#764ba2]/60 bg-gray-50 dark:bg-[#0d0d15]"
        }`}
      >
        {value ? (
          <div className="relative w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
              <span className="text-white text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30">
                Change
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                className="text-white text-[10px] font-semibold px-2.5 py-1 rounded-full bg-red-500/85 hover:bg-red-500 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 px-2 text-center">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9m0 0-3 3m3-3 3 3M3.75 15.75v1.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-1.5" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-tight">
              Drop or <span className="text-[#764ba2] dark:text-[#667eea]">browse</span>
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">.webp, up to 5MB</p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/75 dark:bg-black/75 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-[#764ba2] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/webp"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
        className="hidden"
      />

      <div>
        <button
          type="button"
          onClick={() => setShowUrlInput((s) => !s)}
          className="text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-[#764ba2] dark:hover:text-[#667eea] transition-colors"
        >
          {showUrlInput ? "Hide URL field" : "or paste an image URL"}
        </button>
        {showUrlInput && (
          <input
            placeholder="https://..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131320] px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#764ba2]/50"
          />
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
