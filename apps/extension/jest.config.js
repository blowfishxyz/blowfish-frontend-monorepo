module.exports = {
  roots: ["src"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "~components/(.*)": "<rootDir>/src/components/$1",
    "~utils/(.*)": "<rootDir>/src/utils/$1",
    "~config": "<rootDir>/src/config.ts",
  },
};
