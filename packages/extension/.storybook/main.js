const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  //staticDirs: ["../public"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true,
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve?.alias,
      "~hooks": path.resolve(__dirname, "../src/hooks"),
      "~components": path.resolve(__dirname, "../src/components"),
      "~utils": path.resolve(__dirname, "../src/utils"),
    };

    return config;
  },
};
