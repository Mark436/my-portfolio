import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = path.join(ROOT, "src", "assets", "proyectos");
const API_URL = "https://api.firecrawl.dev/v2/scrape";
const VIEWPORT = { width: 1280, height: 800 };

const SITES = [
  {
    slug: "registro-veranos",
    url: "https://marcosochoa.dev/ejemplos/registroverano",
  },
];

function parseArgs(argv) {
  const options = { force: false, full: false, only: null };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--force") options.force = true;
    else if (arg === "--full") options.full = true;
    else if (arg === "--only") options.only = argv[++i] ?? null;
    else if (arg.startsWith("--only="))
      options.only = arg.slice("--only=".length);
  }
  return options;
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function capture(url, { full }) {
  const headers = { "Content-Type": "application/json" };
  if (process.env.FIRECRAWL_API_KEY) {
    headers.Authorization = `Bearer ${process.env.FIRECRAWL_API_KEY}`;
  }

  const body = {
    url,
    formats: [
      {
        type: "screenshot",
        fullPage: full,
        quality: 85,
        viewport: VIEWPORT,
      },
    ],
    maxAge: 604800000,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(120000),
  });

  if (!response.ok) {
    throw new Error(`Firecrawl ${response.status}: ${await response.text()}`);
  }

  const payload = await response.json();
  const screenshot = payload?.data?.screenshot;
  if (!payload?.success || !screenshot) {
    throw new Error(`respuesta sin screenshot: ${JSON.stringify(payload).slice(0, 300)}`);
  }
  return typeof screenshot === "string" ? screenshot : screenshot.url;
}

async function download(imageUrl) {
  const response = await fetch(imageUrl, { signal: AbortSignal.timeout(120000) });
  if (!response.ok) {
    throw new Error(`descarga ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const targets = options.only
    ? SITES.filter((site) => site.slug === options.only)
    : SITES;

  if (targets.length === 0) {
    console.error(`No hay sitios que coincidan con "${options.only}"`);
    process.exitCode = 1;
    return;
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  const results = { created: [], skipped: [], failed: [] };

  for (const site of targets) {
    const file = path.join(OUTPUT_DIR, `${site.slug}.png`);

    if (!options.force && (await exists(file))) {
      console.log(`skip   ${site.slug} -> ya existe (usa --force para reemplazar)`);
      results.skipped.push(site.slug);
      continue;
    }

    try {
      console.log(`captura ${site.slug} <- ${site.url}`);
      const shotUrl = await capture(site.url, options);
      const bytes = await download(shotUrl);
      await writeFile(file, bytes);
      console.log(`ok     ${site.slug} (${(bytes.length / 1024).toFixed(0)} KB)`);
      results.created.push(site.slug);
    } catch (error) {
      console.error(`error  ${site.slug}: ${error.message}`);
      results.failed.push(site.slug);
    }
  }

  console.log(
    `\ncreadas ${results.created.length} | omitidas ${results.skipped.length} | fallidas ${results.failed.length}`,
  );
  if (results.failed.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
