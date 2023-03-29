import path from "path";

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
    {
      name: "storybook-addon-next",
      options: {
        nextConfigPath: path.resolve(__dirname, "../next.config.js"),
      },
    },
  ],
  staticDirs: ["../public"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpackFinal: async (config: any) => {
    config.resolve.alias = {
      ...config.resolve?.alias,
      "~hooks": path.resolve(__dirname, "../src/hooks"),
      "~components": path.resolve(__dirname, "../src/components"),
      "~utils": path.resolve(__dirname, "../src/utils"),
      "~constants": path.resolve(__dirname, "../src/constants"),
    };

    return config;
  },
};
