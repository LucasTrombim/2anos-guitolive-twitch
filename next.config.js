module.exports = {
  images: {
    domains: ['localhost'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.woff2$/,
      use: 'raw-loader',
    });
    config.module.rules.push({
      test: /\.mp4$/,
      use: 'file-loader?name=videos/[name].[ext]',
    });
    return config;
  },
};
