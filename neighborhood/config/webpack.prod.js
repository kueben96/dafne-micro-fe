const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const domain = process.env.PRODUCTION_DOMAIN;
const prodConfig = {
    mode: 'production',
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/neighborhood/latest/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'neighborhood',
            filename: 'remoteEntry.js',
            exposes: {
                './NeighborhoodApp': './src/bootstrap'
            },
            remotes: {
                theme: `theme@${domain}/theme/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        })
    ],
}

module.exports = merge(commonConfig, prodConfig);