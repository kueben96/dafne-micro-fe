const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/neighborhood/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'neighborhood',
            filename: 'remoteEntry.js',
            exposes: {
                './NeighborhoodApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ],
}

module.exports = merge(commonConfig, prodConfig);