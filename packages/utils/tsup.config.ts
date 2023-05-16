import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  format: ["esm", "cjs"],
  outDir: "build",
  dts: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
  minify: !options.watch,
  entry: {
    types: "./src/types.ts",
    chains: "./src/chains.ts",
    messages: "./src/messages.ts",
    hex: "./src/hex.ts",
    logger: "./src/logger.ts",
    helpers: "./src/helpers.ts",
  },
}));
