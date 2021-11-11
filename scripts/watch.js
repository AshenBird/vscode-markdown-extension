
const { build } = require("vite");
const esbuild = require('esbuild');
const path = require("path");

const getPath = (p)=>path.resolve(__dirname, "../", p);

async function watch(){

  const clientWatcher = await build({
    configFile: getPath("vite.config.ts"),
    build: {
      emptyOutDir:true,
      watch: true,
    },
    esbuild:{
      // tsconfig: getPath('tsconfig.client.json'),
    }
  });

  const hostWatcher = await esbuild.build({
    entryPoints: [getPath("src/host/index.ts")] ,
    tsconfig: getPath('src/host/tsconfig.json'),
    outdir: getPath("out/host"),
    // bundle: true,
    // format: 'cjs',
    platform: 'node',
    // external:["vscode"]
    watch: true,
  }); 
  return [clientWatcher, ];
}

watch();
