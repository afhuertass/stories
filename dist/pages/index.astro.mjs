/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_73EGedir.mjs';
import 'kleur/colors';
import 'html-escaper';
import { g as getAllStories, $ as $$MainLayout } from '../chunks/stories_DGIZjV9A.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allStories = await getAllStories();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Cuando dejamos la Tierra" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-6xl"> <div class="rounded-[2rem] border border-sky-300/10 bg-slate-950/45 px-6 py-10 shadow-glow backdrop-blur-sm md:px-10 md:py-14"> <p class="font-signal text-[0.72rem] uppercase tracking-[0.38em] text-sky-200/55">
Archivo de relatos
</p> <h1 class="mt-5 max-w-4xl font-display text-5xl font-bold tracking-[-0.05em] text-white md:text-7xl">
Cuando dejamos la Tierra
</h1> <p class="mt-6 max-w-3xl font-story text-[2rem] leading-[1.15] text-slate-100/86 md:text-[2.45rem]">
Ficción en un futuro remoto
</p> <div class="mt-10 flex flex-wrap gap-3 text-sm text-slate-300/75"> <span class="rounded-full border border-white/10 px-4 py-2">${allStories.length} historias</span> </div> </div> <div class="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2"> ${allStories.map((story) => renderTemplate`<a${addAttribute(`/stories/${story.slug}`, "href")} class="group rounded-[1.75rem] border border-sky-300/10 bg-slate-950/35 p-7 shadow-glow backdrop-blur-sm transition hover:-translate-y-1 hover:border-sky-300/30"> <span class="text-xs text-slate-500">Por ${story.author}</span> <h2 class="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white transition group-hover:text-sky-100 md:text-5xl"> ${story.title} </h2> <div class="mt-8 flex items-center gap-3 font-signal text-xs uppercase tracking-[0.28em] text-sky-100/75"> <span>Abrir relato</span> <span aria-hidden="true" class="transition group-hover:translate-x-1">→</span> </div> </a>`)} </div> </section> ` })}`;
}, "/Users/andres/stories/stories-from-space/src/pages/index.astro", void 0);

const $$file = "/Users/andres/stories/stories-from-space/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
