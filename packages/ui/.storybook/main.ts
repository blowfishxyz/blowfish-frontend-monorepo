import path from "path";

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
  ],
  staticDirs: ["./public"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true,
  },
  webpackFinal: async (config: any) => {
    config.resolve.alias = {
      ...config.resolve?.alias,
      "~": path.resolve(__dirname, "../src"),
    };

    return config;
  },
};
