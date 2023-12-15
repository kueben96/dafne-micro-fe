const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const deps = require("../package.json").dependencies;
const devConfig = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        uniqueName: 'auth',
        publicPath: "http://localhost:8082/",
    },
    devServer: {
        port: 8082,
        historyApiFallback: {
            historyApiFallback: true,
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            remotes: {
                theme: 'theme@http://localhost:8085/remoteEntry.js',
            },
            exposes: {
                './AuthApp': './src/bootstrap'
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
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);