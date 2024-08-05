import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  format: ["esm", "cjs"],
  outDir: "build",
  dts: true,
  sourcemap: true,
  treeshake: true,
  skipNodeModulesBundle: true,
  minify: !options.watch,
  entry: {
    index: "./src/index.ts",
    fixtures: "./src/fixtures/index.ts",
    v20230605: "./src/clients/v20230605/index.ts",
    v20230517: "./src/clients/v20230517/index.ts",
    v20230308: "./src/clients/v20230308/index.ts",
  },
}));
