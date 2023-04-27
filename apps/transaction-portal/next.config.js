/** @type {import('next').NextConfig} */
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
  webpack: (config) => {
    // TODO: WalletConnectLegacyConnector throws module not found errors
    config.externals.push("fs", "net", "tls");
    return config;
  },
};

module.exports = nextConfig;
