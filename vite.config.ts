import { defineConfig } from "vite";

import { resolve } from "path";

const getPath = (p: string) => resolve(__dirname, p);

export default defineConfig({
  root: getPath("./src/client"),
  // cacheDir: getPath("./out/client"),
  build: {
    outDir: getPath("./out/client"),
  },
});