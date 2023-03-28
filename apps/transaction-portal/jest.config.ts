import type { Config } from "jest";

const config: Config = {
  verbose: true,
  roots: ["src"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  setupFiles: ["<rootDir>/setup-jest.ts"],
  moduleNameMapper: {
    "~hooks/(.*)": "<rootDir>/src/hooks/$1",
    "~components/(.*)": "<rootDir>/src/components/$1",
    "~utils/(.*)": "<rootDir>/src/utils/$1",
    "~config": "<rootDir>/src/config.ts",
  },
};

export default config;
