import type { Project } from "./types";
import previewStudia from "@/assets/proyectos/studia.png";
import previewInterfazLED from "@/assets/proyectos/interfazLED.png";

export const PROYECTOS: Project[] = [
  {
    id: "v3",
    tag: "2026 · Aplicación PWA, Funciones de automatización",
    title: "Studia",
    desc: "Aplicación para consulta de datos academicos, horario, horarios automatizados, reticula, calificaciones, adeudos, progreso y avisos.",
    image: previewStudia,
    chips: ["React", "Tailwindcss", "Go"],
    github: "https://github.com/mark436/studia",
    preview: "https://studiaaa.netlify.app/?demo",
  },
  {
    id: "v2",
    tag: "2026 · Sistema web y backend",
    title: "Interfaz web para arduino",
    desc: "Sistema para comunicarse con un arduino por puerto serial y también desde otro dispositivo vinculado através de internet en la misma sesión.",
    image: previewInterfazLED,
    chips: ["Html", "Javascript", "Css", "Go"],
    github: "https://github.com/Mark436/boton-arduino-led-example",
    preview: "https://led.marcosochoa.dev",
  },
  {
    id: "v1",
    tag: "2026 · Automatización",
    title: "Herramienta de edición",
    desc: "Herramienta de terminal en Python que elimina silencios de un video automáticamente utilizando subtitulos generados automaticamente para detectar los silencios y las partes importantes",
    image: undefined,
    chips: ["Python", "FFmpeg", "Whisper"],
    github: "https://github.com/Mark436/autoEdit",
    preview: null,
  },
];
