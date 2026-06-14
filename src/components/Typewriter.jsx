import React, { useEffect, useRef, useState } from 'react';

function getDelay(baseSpeed, character) {
  if (!character) return baseSpeed;
  if (/[,.;:!?]/.test(character)) return baseSpeed * 3.2;
  if (/\s/.test(character)) return baseSpeed * 0.45;
  return baseSpeed;
}

export default function Typewriter({
  text,
  speed = 18,
  startDelay = 0,
  className = '',
  onComplete,
}) {
  const [visibleLength, setVisibleLength] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId;

    completedRef.current = false;
    setVisibleLength(0);

    if (!text) {
      onComplete?.();
      return undefined;
    }

    const finish = () => {
      if (!completedRef.current && !cancelled) {
        completedRef.current = true;
        onComplete?.();
      }
    };

    const tick = (nextLength) => {
      if (cancelled) return;

      setVisibleLength(nextLength);

      if (nextLength >= text.length) {
        finish();
        return;
      }

      const nextCharacter = text[nextLength];
      timeoutId = window.setTimeout(
        () => tick(nextLength + 1),
        getDelay(speed, nextCharacter),
      );
    };

    timeoutId = window.setTimeout(() => tick(1), startDelay || speed);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [text, speed, startDelay, onComplete]);

  const isTyping = visibleLength < text.length;

  return (
    <span className={className}>
      {text.slice(0, visibleLength)}
      <span
        aria-hidden="true"
        className={`ml-1 inline-block h-[1.05em] w-[0.6ch] rounded-[2px] align-[-0.12em] ${
          isTyping ? 'animate-pulse bg-sky-300/90' : 'bg-transparent'
        }`}
      />
    </span>
  );
}
