const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/marketing/latest/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            remotes: {
                theme: `theme@${domain}/theme/latest/remoteEntry.js`,
            },
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                'react-dom': {
                    requiredVersion: deps["react-dom"],
                    singleton: true,
                },
                '@mui/material': {
                    singleton: true
                }
            }
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);