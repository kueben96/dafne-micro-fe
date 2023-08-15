const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'landing',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './NextApp': './pages/_app.js',
          "./BB8": "./components/banner.js",
        },
        shared: {
          // whatever else
        },
      })
    );

    return config;
  },
};