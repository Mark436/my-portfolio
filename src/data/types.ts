export type ProjectStatus = "done" | "wip";

export interface Project {
  id: string;
  title: string;
  tag: string;
  desc: string;
  image?: string; // relative path under src/assets/proyectos/ or public/
  chips: string[];
  github?: string;
  preview?: string;
  status?: ProjectStatus;
  progress?: number; // 0–100, solo cuando status === "wip"
}