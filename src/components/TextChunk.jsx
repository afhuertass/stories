import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const styleMap = {
  default: {
    wrapper: 'space-y-4',
    paragraph:
      'font-story text-[1.7rem] leading-[1.6] tracking-[0.01em] text-slate-100/95 md:text-[2rem] md:leading-[1.5]',
  },
  'dramatic-reveal': {
    wrapper: 'space-y-4 py-4 text-center',
    paragraph:
      'font-display text-4xl font-semibold tracking-[0.08em] text-white drop-shadow-[0_0_18px_rgba(125,211,252,0.25)] md:text-6xl',
  },
};

function FadingSentence({ text, style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'center 75%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.span ref={ref} style={{ opacity, y, display: 'inline-block' }} className={style.paragraph}>
      {text}{' '}
    </motion.span>
  );
}

export default function TextChunk({ chunk }) {
  const style = styleMap[chunk.style] ?? styleMap.default;

  // Split text by sentence-ending punctuation, keeping the delimiter
  const sentences = chunk.content.flatMap((paragraph) =>
    paragraph.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g) || [paragraph]
  );

  return (
    <div className={style.wrapper}>
      {sentences.map((sentence, index) => (
        <FadingSentence key={index} text={sentence.trim()} style={style} />
      ))}
    </div>
  );
}
