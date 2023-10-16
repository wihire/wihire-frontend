/** @type {import('next').NextConfig} */

const getHost = () => {
  if (process.env.VERCEL_ENV === 'production') {
    return 'https://wihire.vercel.app';
  }
  return process.env.VERCEL ? `https://wihire-dev.vercel.app` : 'http://localhost:3000';
};

const nextConfig = {
  env: {
    BASE_URL: getHost()
  },
  images: {
    domains: ['res.cloudinary.com']
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    config.module.rules.push({
      test: /\.node/,
      use: ['raw-loader']
    });

    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil'
    });

    return config;
  }
};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA(nextConfig);
