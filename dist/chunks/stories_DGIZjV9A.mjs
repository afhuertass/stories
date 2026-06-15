import { c as createComponent, b as addAttribute, e as renderHead, f as renderSlot, a as renderTemplate, d as createAstro } from './astro/server_73EGedir.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Atmospheric interactive sci-fi stories rendered as unfolding transmissions."><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased"> <div class="starfield starfield--slow"></div> <div class="starfield starfield--mid"></div> <div class="starfield starfield--fast"></div> <div class="aurora aurora--one"></div> <div class="aurora aurora--two"></div> <main class="relative z-10 mx-auto min-h-screen w-full max-w-6xl px-6 py-8 md:px-8 md:py-12"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/Users/andres/stories/stories-from-space/src/layouts/MainLayout.astro", void 0);

const STORIES_DIR = path.resolve(process.cwd(), 'src/content/md');
const DEFAULT_AUTHOR = 'Andres Huertas';

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function getSummary(text) {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > 150 ? `${clean.slice(0, 147).trimEnd()}…` : clean;
}

function parseParagraphs(markdown) {
  const lines = markdown.split(/\r?\n/);
  const items = [];
  let title = '';

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (!title && line.startsWith('# ')) {
      title = line.slice(2).trim();
      continue;
    }

    if (line.startsWith('### ')) {
      items.push({ text: line.slice(4).trim(), type: 'h3' });
    } else if (line.startsWith('## ')) {
      items.push({ text: line.slice(3).trim(), type: 'h2' });
    } else {
      let text = line;
      while (text.startsWith('>')) {
        text = text.slice(1).trim();
      }
      if (text) {
        items.push({ text, type: 'p' });
      }
    }
  }

  return { title, items };
}

function toStoryChunks(items) {
  return items.map((item) => {
    if (/^fin$/i.test(item.text)) {
      return { type: 'text', style: 'dramatic-reveal', content: ['Fin'] };
    }
    if (item.type === 'h2') {
      return { type: 'text', style: 'h2', content: [item.text] };
    }
    if (item.type === 'h3') {
      return { type: 'text', style: 'h3', content: [item.text] };
    }

    return { type: 'text', content: [item.text] };
  });
}

async function readStoryFile(fileName) {
  const fullPath = path.join(STORIES_DIR, fileName);
  const markdown = await readFile(fullPath, 'utf8');
  const { title, items } = parseParagraphs(markdown);
  const fallbackTitle = fileName.replace(/\.md$/i, '');
  const storyTitle = title || fallbackTitle;

  return {
    slug: slugify(storyTitle),
    title: storyTitle,
    author: DEFAULT_AUTHOR,
    summary: getSummary(items[0]?.text ?? storyTitle),
    story: toStoryChunks(items),
  };
}

async function getAllStories() {
  const files = (await readdir(STORIES_DIR))
    .filter((file) => file.toLowerCase().endsWith('.md'))
    .sort((a, b) => a.localeCompare(b, 'es'));

  const stories = await Promise.all(files.map(readStoryFile));
  return stories.sort((a, b) => a.title.localeCompare(b.title, 'es'));
}

export { $$MainLayout as $, getAllStories as g };
