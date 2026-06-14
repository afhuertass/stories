import React from 'react';
import { motion } from 'framer-motion';

function ShipSVG() {
  return (
    <svg viewBox="0 0 180 100" className="h-20 w-32 drop-shadow-[0_0_18px_rgba(148,163,184,0.55)]" fill="none">
      <path d="M22 52L90 12L160 52L102 58L90 88L78 58L22 52Z" fill="#cbd5e1" fillOpacity="0.95" />
      <path d="M90 12V88" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 52H132" stroke="#93c5fd" strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" />
      <circle cx="90" cy="42" r="4" fill="#e0f2fe" />
    </svg>
  );
}

export default function AnimationChunk({ animation }) {
  if (animation.name === 'gentle-ship-drift') {
    return (
      <div className="relative overflow-hidden rounded-[1.75rem] border border-sky-400/10 bg-slate-950/45 px-6 py-10 shadow-glow backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.12),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-200/30 to-transparent" />

        <div className="relative flex items-center justify-between gap-4 text-xs uppercase tracking-[0.35em] text-sky-200/50">
          <span className="font-signal">Drift sequence</span>
          <span className="font-signal">Visual transmission</span>
        </div>

        <div className="relative mt-8 h-32 overflow-hidden">
          <motion.div
            className="absolute left-[-22%] top-8"
            initial={{ x: '0%', y: 0, opacity: 0 }}
            animate={{ x: '155%', y: [0, -8, 6, 0], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: (animation.duration ?? 3000) / 1000,
              ease: 'easeInOut',
            }}
          >
            <ShipSVG />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-rose-400/20 bg-rose-950/20 px-5 py-4 text-sm text-rose-200">
      Unknown animation: {animation.name}
    </div>
  );
}
