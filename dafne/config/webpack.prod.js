const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/dafne/latest/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'dafne',
            filename: 'remoteEntry.js',
            exposes: {
                './DafneApp': './src/bootstrap'
            },
            remotes: {
                theme: `theme@${domain}/theme/latest/remoteEntry.js`,
                neighborhood: `neighborhood@${domain}/neighborhood/latest/remoteEntry.js`,
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