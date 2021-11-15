const execa = require("execa");
const fs = require("fs-extra");
const path = require("path");
const esbuild = require("esbuild");
const getPath = (p) => path.resolve(__dirname, "../", p);

fs.ensureDir(getPath("out"));
fs.copySync(getPath("src/template.html"), getPath("out/template.html"));

const watch = async () => {
  const clientWatcher = await esbuild.build({
    entryPoints: [getPath("src/client/index.ts")],
    tsconfig: getPath("src/client/tsconfig.json"),
    outdir: getPath("out/client"),
    bundle: true,
    format: "iife",
    platform: "browser",
  });

  const hostWatcher = execa("npm", ["run", "build:host"]);
  hostWatcher.stdout.pipe(process.stdout);
};

watch();
