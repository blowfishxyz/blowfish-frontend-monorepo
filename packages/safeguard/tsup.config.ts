import {defineConfig} from "tsup";

export default defineConfig((options) => ({
  format: ["esm", "cjs"],
  outDir: "build",
  dts: true,
  sourcemap: true,
  treeshake: true,
  skipNodeModulesBundle: false,
  minify: !options.watch,
  entry: {
    index: "./src/index.ts",
  }
}));
