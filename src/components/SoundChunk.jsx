import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function SoundChunk({ sound }) {
  const audioRef = useRef(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
  }, [sound.file]);

  const bars = useMemo(() => [0, 1, 2, 3], []);

  return (
    <div className="rounded-[1.5rem] border border-sky-400/10 bg-slate-950/45 px-5 py-4 shadow-glow backdrop-blur-sm">
      <audio ref={audioRef} src={`/assets/sounds/${sound.file}`} preload="auto" />

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-signal text-[0.7rem] uppercase tracking-[0.35em] text-sky-200/55">
            Audio cue
          </p>
          <p className="mt-2 text-sm text-slate-200/85">
            {sound.file}
            {blocked && <span className="ml-2 text-slate-400">(tap required by browser)</span>}
          </p>
        </div>

        <div className="flex items-end gap-1.5">
          {bars.map((bar) => (
            <motion.span
              key={bar}
              className="w-1.5 rounded-full bg-sky-300/80"
              animate={{ height: ['10px', '24px', '14px', '28px', '12px'] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: bar * 0.08,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
