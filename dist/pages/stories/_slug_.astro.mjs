/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, d as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_73EGedir.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout, g as getAllStories } from '../../chunks/stories_DGIZjV9A.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef as useRef$1, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export { renderers } from '../../renderers.mjs';

const styleMap = {
  default: {
    wrapper: "space-y-4",
    paragraph: "font-story text-[1.4rem] leading-[1.6] tracking-[0.01em] text-slate-100/95 md:text-[1.6rem] md:leading-[1.5] text-justify"
  },
  h2: {
    wrapper: "py-8",
    paragraph: "font-display text-4xl font-bold text-white md:text-5xl"
  },
  h3: {
    wrapper: "py-4",
    paragraph: "font-display text-2xl font-semibold text-sky-200 md:text-3xl"
  },
  "dramatic-reveal": {
    wrapper: "space-y-4 py-4 text-center",
    paragraph: "font-display text-4xl font-semibold tracking-[0.08em] text-white drop-shadow-[0_0_18px_rgba(125,211,252,0.25)] md:text-6xl"
  }
};
function TextChunk({ chunk }) {
  const style = styleMap[chunk.style] ?? styleMap.default;
  const Tag = chunk.style === "h2" ? "h2" : chunk.style === "h3" ? "h3" : "p";
  return /* @__PURE__ */ jsx("div", { className: style.wrapper, children: chunk.content.map((paragraph, index) => /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 15 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.1 },
      transition: { duration: 1, ease: "easeOut" },
      children: /* @__PURE__ */ jsx(Tag, { className: style.paragraph, children: paragraph })
    },
    index
  )) });
}

function ShipSVG() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 180 100", className: "h-20 w-32 drop-shadow-[0_0_18px_rgba(148,163,184,0.55)]", fill: "none", children: [
    /* @__PURE__ */ jsx("path", { d: "M22 52L90 12L160 52L102 58L90 88L78 58L22 52Z", fill: "#cbd5e1", fillOpacity: "0.95" }),
    /* @__PURE__ */ jsx("path", { d: "M90 12V88", stroke: "#f8fafc", strokeWidth: "3", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M48 52H132", stroke: "#93c5fd", strokeOpacity: "0.85", strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx("circle", { cx: "90", cy: "42", r: "4", fill: "#e0f2fe" })
  ] });
}
function AnimationChunk({ animation }) {
  if (animation.name === "gentle-ship-drift") {
    return /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-[1.75rem] border border-sky-400/10 bg-slate-950/45 px-6 py-10 shadow-glow backdrop-blur-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.12),transparent_55%)]" }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-200/30 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between gap-4 text-xs uppercase tracking-[0.35em] text-sky-200/50", children: [
        /* @__PURE__ */ jsx("span", { className: "font-signal", children: "Drift sequence" }),
        /* @__PURE__ */ jsx("span", { className: "font-signal", children: "Visual transmission" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative mt-8 h-32 overflow-hidden", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute left-[-22%] top-8",
          initial: { x: "0%", y: 0, opacity: 0 },
          animate: { x: "155%", y: [0, -8, 6, 0], opacity: [0, 1, 1, 0] },
          transition: {
            duration: (animation.duration ?? 3e3) / 1e3,
            ease: "easeInOut"
          },
          children: /* @__PURE__ */ jsx(ShipSVG, {})
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-400/20 bg-rose-950/20 px-5 py-4 text-sm text-rose-200", children: [
    "Unknown animation: ",
    animation.name
  ] });
}

function SoundChunk({ sound }) {
  const audioRef = useRef$1(null);
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
  }, [sound.file]);
  const bars = useMemo(() => [0, 1, 2, 3], []);
  return /* @__PURE__ */ jsxs("div", { className: "rounded-[1.5rem] border border-sky-400/10 bg-slate-950/45 px-5 py-4 shadow-glow backdrop-blur-sm", children: [
    /* @__PURE__ */ jsx("audio", { ref: audioRef, src: `/assets/sounds/${sound.file}`, preload: "auto" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-signal text-[0.7rem] uppercase tracking-[0.35em] text-sky-200/55", children: "Audio cue" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-slate-200/85", children: [
          sound.file,
          blocked && /* @__PURE__ */ jsx("span", { className: "ml-2 text-slate-400", children: "(tap required by browser)" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-end gap-1.5", children: bars.map((bar) => /* @__PURE__ */ jsx(
        motion.span,
        {
          className: "w-1.5 rounded-full bg-sky-300/80",
          animate: { height: ["10px", "24px", "14px", "28px", "12px"] },
          transition: {
            duration: 0.9,
            repeat: Infinity,
            repeatType: "mirror",
            delay: bar * 0.08,
            ease: "easeInOut"
          }
        },
        bar
      )) })
    ] })
  ] });
}

const AUTO_ADVANCE_PADDING = 300;
function StoryViewer({ story }) {
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
  const canContinue = currentChunk?.type === "text" && !isLastChunk;
  const revealNextChunk = useCallback(() => {
    if (!currentChunk) return;
    clickAudioRef.current?.play().catch((e) => console.log("Audio playback failed", e));
    if (isLastChunk) {
      setCompleted(true);
      return;
    }
    setRevealedCount((count) => Math.min(count + 1, story.length));
  }, [currentChunk, isLastChunk, story.length]);
  useEffect(() => {
    if (!currentChunk || currentChunk.type === "text") {
      if (isLastChunk && currentChunk?.type === "text") {
        setCompleted(true);
      }
      return void 0;
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
    if (!canContinue) return void 0;
    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
        event.preventDefault();
        revealNextChunk();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canContinue, revealNextChunk]);
  if (!story.length) {
    return /* @__PURE__ */ jsx("p", { className: "text-rose-300", children: "No se encontró contenido para este relato." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("audio", { ref: clickAudioRef, src: "/assets/sounds/click.mp3", preload: "auto" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/30 to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl space-y-[10vh] py-[8vh] md:space-y-[14vh] md:py-[10vh]", children: visibleChunks.map((chunk, index) => /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative",
        children: [
          chunk.type === "text" && /* @__PURE__ */ jsx(TextChunk, { chunk }),
          chunk.type === "animation" && /* @__PURE__ */ jsx(AnimationChunk, { animation: chunk }),
          chunk.type === "sound" && /* @__PURE__ */ jsx(SoundChunk, { sound: chunk })
        ]
      },
      `${chunk.type}-${index}`
    )) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: canContinue && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.6 },
        className: "mt-6 flex min-h-[120px] justify-center pb-[18vh]",
        children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: revealNextChunk,
            className: "group relative rounded-full border border-sky-300/20 bg-slate-950/80 px-8 py-4 font-signal text-xs uppercase tracking-[0.32em] text-sky-100 shadow-glow backdrop-blur-md transition hover:border-sky-200/50 hover:text-white",
            children: [
              /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "Continuar ↓" }),
              /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-sky-500/10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" })
            ]
          }
        )
      }
    ) }),
    completed && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1.2, delay: 0.2 },
        className: "mx-auto mt-16 max-w-3xl rounded-2xl border border-sky-400/10 bg-slate-950/35 px-6 py-5 text-center shadow-glow backdrop-blur-sm",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-signal text-[0.72rem] uppercase tracking-[0.35em] text-sky-200/45", children: "Transmisión completa" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 font-story text-2xl text-slate-100/90 md:text-3xl", children: "Fin." })
        ]
      }
    )
  ] });
}

const $$Astro = createAstro();
async function getStaticPaths() {
  const allStories = await getAllStories();
  return allStories.map((story) => ({
    params: { slug: story.slug },
    props: { storyData: story }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { storyData } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `${storyData.title} | Luego de Marcharnos` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-5xl"> <a href="/" class="inline-flex items-center gap-2 rounded-full border border-sky-300/10 bg-slate-950/40 px-4 py-2 font-signal text-xs uppercase tracking-[0.28em] text-slate-300/80 transition hover:border-sky-300/30 hover:text-white">
← Volver al archivo
</a> <header class="mt-4 rounded-[2rem] border border-sky-300/10 bg-slate-950/45 px-6 py-6 shadow-glow backdrop-blur-sm md:px-10 md:py-8"> <p class="font-signal text-[0.72rem] uppercase tracking-[0.36em] text-sky-200/55">
Relato
</p> <h1 class="mt-5 font-display text-5xl font-bold tracking-[-0.04em] text-white md:text-7xl"> ${storyData.title} </h1> <div class="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300/75"> <span class="rounded-full border border-white/10 px-4 py-2">Por ${storyData.author}</span> </div> </header> <section class="mt-6 mx-auto max-w-5xl rounded-[2rem] border border-sky-300/10 bg-slate-950/35 px-6 py-6 shadow-glow backdrop-blur-sm md:px-10 md:py-8"> ${renderComponent($$result2, "StoryViewer", StoryViewer, { "story": storyData.story, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/andres/stories/stories-from-space/src/components/StoryViewer.jsx", "client:component-export": "default" })} </section> </section> ` })}`;
}, "/Users/andres/stories/stories-from-space/src/pages/stories/[slug].astro", void 0);

const $$file = "/Users/andres/stories/stories-from-space/src/pages/stories/[slug].astro";
const $$url = "/stories/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
