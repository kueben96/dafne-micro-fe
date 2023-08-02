const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'landing_page',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './NextApp': './pages/_app.js',
        },
        shared: {
          // whatever else
        },
      })
    );

    return config;
  },
};