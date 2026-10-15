import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = path.join(ROOT, "public", "og-image.png");
const AVATAR = path.join(ROOT, "src", "assets", "perfil.jpg");

const WIDTH = 1200;
const HEIGHT = 630;
const AVATAR_SIZE = 168;
const AVATAR_X = 88;
const AVATAR_Y = 96;

const MONO = "'Space Mono', 'Courier New', ui-monospace, monospace";
const SANS = "'Inter', 'Segoe UI', Arial, ui-sans-serif, sans-serif";

/** Máscara circular para recortar el avatar. */
function circleMask(size) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
      `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  );
}

async function circularAvatar() {
  return sharp(AVATAR)
    .resize(AVATAR_SIZE, AVATAR_SIZE, { fit: "cover", position: "top" })
    .composite([{ input: circleMask(AVATAR_SIZE), blend: "dest-in" }])
    .png()
    .toBuffer();
}

function backgroundSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" font-family="${SANS}">
    <defs>
      <radialGradient id="glow" cx="12%" cy="6%" r="72%">
        <stop offset="0%" stop-color="#84cc16" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="#84cc16" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse">
        <path d="M52 0H0v52" fill="none" stroke="#f4f4f5" stroke-opacity="0.045"/>
      </pattern>
    </defs>

    <rect width="${WIDTH}" height="${HEIGHT}" fill="#09090b"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

    <text x="296" y="200" font-family="${MONO}" font-size="74" font-weight="700" fill="#f4f4f5" letter-spacing="-1">Marcos Ochoa</text>
    <text x="298" y="248" font-size="30" fill="#a1a1aa">Desarrollador Full-stack</text>

    <line x1="88" y1="332" x2="1112" y2="332" stroke="#27272a" stroke-width="2"/>

    <text x="88" y="430" font-size="46" fill="#f4f4f5">Sistemas web y automatización a medida.</text>
    <text x="88" y="492" font-size="30" fill="#a1a1aa">React · Node · Go · Astro</text>

    <rect x="88" y="544" width="44" height="6" rx="3" fill="#84cc16"/>
    <text x="152" y="560" font-family="${MONO}" font-size="28" fill="#84cc16">marcosochoa.dev</text>
  </svg>`;
}

async function main() {
  const avatar = await circularAvatar();

  await sharp(Buffer.from(backgroundSvg()))
    .composite([{ input: avatar, top: AVATAR_Y, left: AVATAR_X }])
    .png({ compressionLevel: 9 })
    .toFile(OUTPUT);

  console.log(`og-image → ${path.relative(ROOT, OUTPUT)} (${WIDTH}x${HEIGHT})`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
