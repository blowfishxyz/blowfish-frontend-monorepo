"use strict";
exports.__esModule = true;
var tsup_1 = require("tsup");
exports["default"] = (0, tsup_1.defineConfig)({
    entry: {
        index: "index.ts"
    },
    format: ["esm", "cjs"],
    dts: true
});
