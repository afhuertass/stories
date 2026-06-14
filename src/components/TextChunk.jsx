import React from 'react';
import { motion } from 'framer-motion';

const styleMap = {
  default: {
    wrapper: 'space-y-4',
    paragraph:
      'font-story text-[1.4rem] leading-[1.6] tracking-[0.01em] text-slate-100/95 md:text-[1.6rem] md:leading-[1.5] text-justify',
  },
  'dramatic-reveal': {
    wrapper: 'space-y-4 py-4 text-center',
    paragraph:
      'font-display text-4xl font-semibold tracking-[0.08em] text-white drop-shadow-[0_0_18px_rgba(125,211,252,0.25)] md:text-6xl',
  },
};

export default function TextChunk({ chunk }) {
  const style = styleMap[chunk.style] ?? styleMap.default;

  return (
    <div className={style.wrapper}>
      {chunk.content.map((paragraph, index) => (
        <motion.p
          key={index}
          className={style.paragraph}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
}
