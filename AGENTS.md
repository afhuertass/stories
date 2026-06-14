# AGENTS.md

Guidance for coding agents working in `stories-from-space/`.

## Project summary

Stories from Space is an Astro + React storytelling site.
Stories are stored as JSON files and rendered as cinematic, progressively revealed scenes with text, sound, and simple animations.

## Stack

- Astro 4
- React 18
- Framer Motion
- Tailwind CSS

## Commands

Run from `stories-from-space/`:

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the built site

## Repo map

- `src/pages/index.astro` — story index / landing page
- `src/pages/stories/[slug].astro` — story detail page
- `src/components/StoryViewer.jsx` — progressive story playback
- `src/components/TextChunk.jsx` — text scene rendering
- `src/components/AnimationChunk.jsx` — visual scene rendering
- `src/components/SoundChunk.jsx` — audio cue rendering
- `src/content/stories/*.json` — story content
- `public/assets/sounds/` — audio assets

## Story content format

Each story JSON uses this shape:

```json
{
  "slug": "story-slug",
  "title": "Story Title",
  "author": "Author",
  "summary": "One-line summary",
  "theme": "cosmic-ethereal",
  "story": [
    {
      "type": "text",
      "content": ["Paragraph 1", "Paragraph 2"]
    },
    {
      "type": "animation",
      "name": "gentle-ship-drift",
      "duration": 3000
    },
    {
      "type": "sound",
      "file": "chime.mp3",
      "duration": 1500
    }
  ]
}
```

## Working conventions

- Preserve the progressive “unfolding” reading experience.
- Do not replace previous story paragraphs when advancing.
- Keep story text atmospheric and readable.
- Favor lightweight effects over heavy dependencies.
- Reuse existing chunk types before inventing new ones.
- If you add a new animation or sound reference, also add the matching asset/renderer.

## UI conventions

- `font-display` for headings and labels
- `font-story` for narrative text
- `font-signal` for small sci-fi UI details
- Keep the dark, cinematic space aesthetic

## When adding stories

1. Add a new JSON file under `src/content/stories/`.
2. Ensure `slug` matches the file’s route target.
3. Keep summaries short.
4. Use `text`, `sound`, and `animation` chunks intentionally.
5. If using `style: "dramatic-reveal"`, reserve it for short, high-impact lines.

## Validation

Before finishing:

- run `npm run build`
- confirm story routes render
- confirm audio paths exist
- confirm new chunk types/styles are handled in the UI
