import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

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

export async function getAllStories() {
  const files = (await readdir(STORIES_DIR))
    .filter((file) => file.toLowerCase().endsWith('.md'))
    .sort((a, b) => a.localeCompare(b, 'es'));

  const stories = await Promise.all(files.map(readStoryFile));
  return stories.sort((a, b) => a.title.localeCompare(b.title, 'es'));
}
