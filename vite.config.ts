import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { copyFileSync } from "node:fs";
import { join } from "node:path";
import { nodePolyfills } from 'vite-plugin-node-polyfills'

installGlobals();

export default defineConfig({
  base: "/influence-scouter/",
  plugins: [remix({
    ssr: false,
    basename: "/influence-scouter/",
    buildEnd(args) {
      if (!args.viteConfig.isProduction) return;
      const buildPath = args.viteConfig.build.outDir;
      copyFileSync(
        join(buildPath, "index.html"),
        join(buildPath, "404.html"),
      );
    }
  }), tsconfigPaths(),
    nodePolyfills({
      exclude: ['stream', 'fs']
    }),],
});
