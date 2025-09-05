import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/projects-src";
const OUT = "public/projects";  
const WIDTH = 1280, HEIGHT = 800;   

fs.mkdirSync(OUT, { recursive: true });

for (const file of fs.readdirSync(SRC)) {
  const inPath = path.join(SRC, file);
  const outPath = path.join(OUT, file.replace(/\.(jpeg|jpg)$/i, ".png"));
  const extOk = /\.(png|jpg|jpeg|webp)$/i.test(file);
  if (!extOk) continue;

  await sharp(inPath)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
    .toFormat("png")
    .toFile(outPath);

  console.log("Wrote", outPath);
}
