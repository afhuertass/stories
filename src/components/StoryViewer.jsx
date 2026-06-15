import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TextChunk from './TextChunk.jsx';
import AnimationChunk from './AnimationChunk.jsx';
import SoundChunk from './SoundChunk.jsx';

const AUTO_ADVANCE_PADDING = 300;

export default function StoryViewer({ story }) {
  const [revealedCount, setRevealedCount] = useState(story.length ? 1 : 0);
  const [completed, setCompleted] = useState(false);
  const clickAudioRef = useRef(null);

  useEffect(() => {
    setRevealedCount(story.length ? 1 : 0);
    setCompleted(false);
  }, [story]);

  const currentIndex = Math.max(revealedCount - 1, 0);
  const currentChunk = story[currentIndex];
  const isLastChunk = currentIndex === story.length - 1;
  const visibleChunks = useMemo(() => story.slice(0, revealedCount), [story, revealedCount]);
  const canContinue = currentChunk?.type === 'text' && !isLastChunk;

  const revealNextChunk = useCallback(() => {
    if (!currentChunk) return;

    // 80% chance to play sound
    if (Math.random() < 0.8) {
      clickAudioRef.current?.play().catch((e) => console.log('Audio playback failed', e));
    }

    if (isLastChunk) {
      setCompleted(true);
      return;
    }

    setRevealedCount((count) => Math.min(count + 1, story.length));
  }, [currentChunk, isLastChunk, story.length]);

  useEffect(() => {
    if (!currentChunk || currentChunk.type === 'text') {
      if (isLastChunk && currentChunk?.type === 'text') {
        setCompleted(true);
      }
      return undefined;
    }

    const timer = window.setTimeout(() => {
      if (isLastChunk) {
        setCompleted(true);
      } else {
        revealNextChunk();
      }
    }, (currentChunk.duration ?? 1200) + AUTO_ADVANCE_PADDING);

    return () => window.clearTimeout(timer);
  }, [currentChunk, isLastChunk, revealNextChunk]);

  useEffect(() => {
    if (!canContinue) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        revealNextChunk();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canContinue, revealNextChunk]);

  if (!story.length) {
    return <p className="text-rose-300">No se encontró contenido para este relato.</p>;
  }

  return (
    <div className="relative">
      <audio ref={clickAudioRef} src="/assets/sounds/click.mp3" preload="auto" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/30 to-transparent" />

      <div className="mx-auto max-w-4xl space-y-8 py-[4vh] md:space-y-12 md:py-[6vh]">
        {visibleChunks.map((chunk, index) => (
          <section
            key={`${chunk.type}-${index}`}
            className="relative"
          >
            {chunk.type === 'text' && <TextChunk chunk={chunk} />}
            {chunk.type === 'animation' && <AnimationChunk animation={chunk} />}
            {chunk.type === 'sound' && <SoundChunk sound={chunk} />}
          </section>
        ))}
      </div>

      <AnimatePresence>
        {canContinue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 flex min-h-[120px] justify-center pb-[18vh]"
          >
            <button
              type="button"
              onClick={revealNextChunk}
              className="group relative rounded-full border border-sky-300/20 bg-slate-950/80 px-8 py-4 font-signal text-xs uppercase tracking-[0.32em] text-sky-100 shadow-glow backdrop-blur-md transition hover:border-sky-200/50 hover:text-white"
            >
              <span className="relative z-10">Continuar ↓</span>
              <span className="absolute inset-0 rounded-full bg-sky-500/10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {completed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mx-auto mt-16 max-w-3xl rounded-2xl border border-sky-400/10 bg-slate-950/35 px-6 py-5 text-center shadow-glow backdrop-blur-sm"
        >
          <p className="font-signal text-[0.72rem] uppercase tracking-[0.35em] text-sky-200/45">
        FIN
          </p>
          <p className="mt-3 font-story text-2xl text-slate-100/90 md:text-3xl">Fin.</p>
        </motion.div>
      )}
    </div>
  );
}
