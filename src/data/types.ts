import type { ImageMetadata } from "astro";

/** "done" = terminado · "wip" = en desarrollo (muestra etiqueta + progreso). */
export type ProjectStatus = "done" | "wip";

export interface Project {
  /** Identificador estable (se usa como key al renderizar listas). */
  id: string;
  /** Encabezado tipo "2026 · Aplicación PWA". */
  tag: string;
  title: string;
  desc: string;
  /** Captura del proyecto. Si falta, se usa el placeholder SVG. */
  image?: ImageMetadata;
  chips: string[];
  github?: string | null;
  preview?: string | null;
  /** Por defecto "done". */
  status?: ProjectStatus;
  /** Progreso 0–100 (solo relevante si status === "wip"). */
  progress?: number;
}

export interface InfoItem {
  label: string;
  value: string;
}

export interface NavItem {
  href: string;
  content: string;
}
