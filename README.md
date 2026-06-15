# Luego de Marcharnos

Este proyecto es una plataforma interactiva de relatos de ciencia ficción, diseñada para ofrecer una experiencia de lectura inmersiva y atmosférica.

## Descripción

"Luego de Marcharnos" presenta historias que se desarrollan en un futuro lejano. La plataforma utiliza un formato de lectura progresiva donde los relatos se revelan poco a poco mientras el usuario avanza, apoyado por animaciones cinemáticas al hacer scroll.

## Características

- **Lectura Progresiva:** Los párrafos se revelan a medida que el usuario se desplaza, manteniendo un ritmo de lectura controlado.
- **Estética Cinematográfica:** Diseño minimalista y oscuro, optimizado para una inmersión total.
- **Modular:** Añadir nuevas historias es tan sencillo como crear un archivo Markdown en la carpeta `src/content/md/`.

## Cómo añadir nuevos relatos

1. Crea un archivo nuevo en `src/content/md/` (ejemplo: `MiNuevaHistoria.md`).
2. Sigue este formato básico:

```markdown
# Título del Relato

Aquí comienza la historia. Cada párrafo separado por una línea en blanco se convierte en una escena independiente.

Puedes incluir diálogos y descripciones.

Fin
```

3. El sistema reconocerá automáticamente el título, el resumen (basado en el primer párrafo) y estructurará el relato para la interfaz de lectura. La palabra `Fin` al final del archivo activa la pantalla de cierre del relato.

## Tecnologías

- **Astro:** Framework para contenido estático y rápido.
- **React:** Para la interactividad del visor de historias.
- **Framer Motion:** Para las animaciones fluidas de aparición de texto.
- **Tailwind CSS:** Para el diseño y estilizado.

## Ejecución

- `npm run dev` — Iniciar servidor de desarrollo.
- `npm run build` — Generar los archivos estáticos para producción.
