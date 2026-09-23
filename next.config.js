/** @type {import('next').NextConfig} */
const nextConfig = {
  // The layout loads Google Fonts via a plain <link> tag (resolved client-side
  // in the browser) rather than next/font/google, specifically so a flaky or
  // restricted build network can't fail the build. optimizeFonts must also be
  // disabled — otherwise Next still tries to fetch and inline that stylesheet
  // at build time even though it's a plain <link>, not a next/font import.
  optimizeFonts: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.asos-media.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
