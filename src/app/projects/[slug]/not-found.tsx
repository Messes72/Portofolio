"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen bg-[#87CEEB] flex items-center justify-center px-4 scanlines">
      {/* Pixel grid background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4FC3F7 1px, transparent 1px),
            linear-gradient(to bottom, #4FC3F7 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative text-center max-w-lg mx-auto">
        {/* Pixel border container */}
        <div className="relative inline-block p-8 md:p-12">
          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-4 border-[#F48FB1] border-r-0 border-b-0" />
          <div className="absolute -top-2 -right-2 w-4 h-4 border-4 border-[#F48FB1] border-l-0 border-b-0" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-4 border-[#F48FB1] border-r-0 border-t-0" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-4 border-[#F48FB1] border-l-0 border-t-0" />

          {/* Error icon - pixel style */}
          <div className="mb-6 flex justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 16 16"
              fill="none"
              className="text-[#F48FB1]"
            >
              {/* Pixel X mark */}
              <rect x="2" y="2" width="2" height="2" fill="currentColor" />
              <rect x="6" y="6" width="4" height="4" fill="currentColor" />
              <rect x="12" y="2" width="2" height="2" fill="currentColor" />
              <rect x="2" y="12" width="2" height="2" fill="currentColor" />
              <rect x="12" y="12" width="2" height="2" fill="currentColor" />
              <rect x="4" y="4" width="2" height="2" fill="currentColor" />
              <rect x="10" y="4" width="2" height="2" fill="currentColor" />
              <rect x="4" y="10" width="2" height="2" fill="currentColor" />
              <rect x="10" y="10" width="2" height="2" fill="currentColor" />
            </svg>
          </div>

          {/* Main title */}
          <h1
            className="text-3xl md:text-4xl text-[#F48FB1] mb-4 animate-pulse"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            GAME NOT FOUND
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-[#4FC3F7] mb-2"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            ERROR 404
          </p>

          {/* Description */}
          <p
            className="text-base md:text-lg text-[#B8B8D1] mb-8"
            style={{ fontFamily: "var(--font-vt323)" }}
          >
            The cartridge you&apos;re looking for doesn&apos;t exist in our collection.
            <br />
            <span className="text-[#7CB342]">Perhaps it was never created...</span>
          </p>

          {/* Blinking cursor */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <motion.span
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                times: [0, 0.25, 0.75, 1],
              }}
              className="w-3 h-3 bg-[#FFD54F]"
            />
            <span
              className="text-sm text-[#B8B8D1] uppercase"
              style={{ fontFamily: "var(--font-vt323)" }}
            >
              Press START to continue
            </span>
          </div>

          {/* Back button */}
          <Link
            href="/#projects"
            className="relative inline-flex items-center gap-2 px-6 py-3 bg-[#8D6E63] text-white border-4 border-[#8D6E63] hover:bg-[#6D4C41] hover:border-[#6D4C41] transition-all duration-100 pixel-btn"
            style={{ fontFamily: "var(--font-pixel)", fontSize: "14px" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <rect x="8" y="4" width="4" height="4" />
              <rect x="4" y="6" width="4" height="4" />
              <rect x="8" y="8" width="4" height="4" />
              <rect x="6" y="10" width="4" height="4" />
            </svg>
            BACK TO PROJECTS
          </Link>
        </div>

        {/* Decorative pixels */}
        <div className="flex justify-center gap-1 mt-8 text-[#6D4C41]">
          <div className="w-2 h-2 bg-current" />
          <div className="w-2 h-2 bg-current" />
          <div className="w-2 h-2 bg-current" />
        </div>
      </div>
    </main>
  );
}