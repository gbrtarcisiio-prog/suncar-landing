import { execFileSync } from "node:child_process";
import { access, cp, mkdir, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "public");

execFileSync("pnpm", ["exec", "vite", "build"], {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    VITE_ASSET_BASE: "/media",
    SUNCAR_PORTABLE_BUILD: "true",
  },
});

// Do not ship preview-only collector/debug files to the public static host.
await rm(path.join(output, "__manus__"), { recursive: true, force: true });
await rm(path.join(output, ".gitkeep"), { force: true });

const html = await readFile(path.join(output, "index.html"), "utf8");
const internalMarkers = [
  'id="manus-runtime"',
  "__MANUS_HOST_DEV__",
  "/__manus__",
  "/manus-storage",
];
const found = internalMarkers.filter(marker => html.includes(marker));
if (found.length) {
  throw new Error(
    `Portable build contains preview-only references: ${found.join(", ")}`
  );
}

const mediaSource = path.join(root, "hosting-assets", "media");
const mediaTarget = path.join(output, "media");
await mkdir(output, { recursive: true });
await rm(mediaTarget, { recursive: true, force: true });
await cp(mediaSource, mediaTarget, { recursive: true });

const mediaFiles = await readdir(mediaTarget);
if (mediaFiles.length < 9) {
  throw new Error(`Expected 9 local media files; found ${mediaFiles.length}`);
}
for (const name of mediaFiles) await access(path.join(mediaTarget, name));
console.log(`\nStatic site ready at ${output}`);
console.log(
  `Copied ${mediaFiles.length} local media files into dist/public/media`
);
console.log(
  "Preview-only runtime, collector, and storage-proxy references: none"
);
