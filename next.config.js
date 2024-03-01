module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback, // The rest of your fallbacks if necessary
      fs: false,
      crypto: "crypto-browserify",
    };

    // Push new rules to the module in the webpack config
    if (!isServer) {
      config.module.rules.push({
        test: /\.css$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader"],
      });
      config.module.rules.push({
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      });
    }

    return config;
  },
};
