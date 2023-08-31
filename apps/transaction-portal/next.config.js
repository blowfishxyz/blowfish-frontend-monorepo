/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  frame-ancestors 'self';
`;

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
  // allow all because we don't know where the images are hosted
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/offboarding",
        destination: "https://airtable.com/shr8iCQakDgw2HAkq",
        permanent: false,
      },
    ];
  },
  headers: async () => [
    {
      source: "/(.*?)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
        },
      ],
    },
  ],
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: "blowfish",
    project: "transaction-portal",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
