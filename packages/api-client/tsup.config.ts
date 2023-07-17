import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  format: ["esm", "cjs"],
  outDir: "build",
  dts: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
  minify: !options.watch,
  entry: {
    index: "./src/index.ts",
    v20230517: "./src/clients/v20230517/index.ts",
  },
}));
