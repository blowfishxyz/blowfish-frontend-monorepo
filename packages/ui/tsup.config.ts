import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm", "cjs"],
  outDir: "build",
  dts: true,
  entry: {
    index: "./src/index.ts",
  },
});
