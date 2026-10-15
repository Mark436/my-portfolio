import type { InfoItem, NavItem } from "./types";

/** Datos de la sección "Sobre mí". */
export const INFO: InfoItem[] = [
  { label: "Rol", value: "Sistemas Computacionales" },
  { label: "Institución", value: "ITH" },
  { label: "Stack", value: "React · Supabase · Node" },
  { label: "Enfoque", value: "Full-stack · Automatización" },
  { label: "Ubicación", value: "Hermosillo, MX" },
];

export const CONTACT = {
  MAIL: "contacto@marcosochoa.dev?subject=Me%20interesa%20saber%20sobre",
  GITHUB: "mark436",
};

/** Enlaces del header. Cada href debe apuntar a una sección de la página. */
export const NAV_ITEMS: NavItem[] = [
  { href: "#proyectos", content: "Proyectos" },
  { href: "#sobre-mi", content: "Sobre mi" },
  { href: "#skills", content: "Skills" },
];
