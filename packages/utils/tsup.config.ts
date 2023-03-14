import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "./index.ts",
    types: "./types.ts",
    BlowfishApiClient: "./BlowfishApiClient/index.ts",
    chains: "./chains.ts",
  },
  format: ["esm", "cjs"],
  outDir: "build",
  dts: true,
});
