const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'landing',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './NextApp': './pages/index.js',
          "./BB8": "./components/BB8",
          "./Button": "./components/Button",
          "./ServicesCard": "./components/ServicesCard",
        },
        remotes: {
          theme: 'theme@http://localhost:8085/remoteEntry.js',
        },
        shared: {
          // whatever else
        },
        extraOptions: {
          exposesPages: true
        },
      })
    );

    return config;
  },
};

