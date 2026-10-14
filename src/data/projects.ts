import type { Project } from "./types";

// Proyectos del portafolio (datos reales sacados de sus repos)
export const PROJECTS: Project[] = [
  {
    id: "v3",
    tag: "2026 · Aplicación PWA",
    title: "Studia",
    desc: "Aplicación para consulta de datos académicos, horario, retícula, calificaciones, adeudos, progreso y avisos. Front (React + TS + Vite + Tailwind) + Go (API proxy / SITH client) + PWA. Demo: studiaaa.netlify.app.",
    image: "/proyectos/registro-veranos.png", // placeholder hasta tener captura real
    chips: ["React", "Tailwindcss", "Go"],
    github: "https://github.com/mark436/studia",
    preview: "https://studiaaa.netlify.app",
    status: "done",
  },
  {
    id: "v2",
    tag: "2026 · Sistema web y backend",
    title: "Botón Arduino LED",
    desc: "Front estático (HTML/JS/CSS) + backend Go: el host controla el LED del Arduino por Web Serial (puerto COM) y los visitors entran por QR y lo manejan en tiempo real por WebSocket. Sesiones, modal de usuarios, Docker + Caddy.",
    image: undefined,
    chips: ["HTML", "JavaScript", "Go", "WebSocket", "Web Serial"],
    github: null,
    preview: null, // el preview actual apuntaba a página borrada; lo dejamos null hasta nuevo demo
    status: "wip",
    progress: 80,
  },
  {
    id: "v1",
    tag: "2025 · Automatización",
    title: "Herramienta de edición de video",
    desc: "Herramienta de terminal en Python que elimina silencios de un video automáticamente utilizando subtítulos generados automáticamente para detectar silencios y las partes importantes.",
    image: null,
    chips: ["Python", "FFmpeg", "Whisper"],
    github: "https://github.com/Mark436/autoEdit",
    preview: null,
    status: "done",
  },
];