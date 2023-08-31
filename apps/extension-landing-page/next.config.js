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
