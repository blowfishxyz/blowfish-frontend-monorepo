import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm", "cjs"],
  outDir: "build",
  dts: true,
  entry: {
    icons: "./src/icons/index.ts",
    core: "./src/core/index.ts",
  },
});
