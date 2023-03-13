import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "./index.ts",
    types: "./types.ts",
    BlowfishApiClient: "./BlowfishApiClient/index.ts",
  },
  format: ["esm", "cjs"],
  outDir: "build",
  dts: true,
});
