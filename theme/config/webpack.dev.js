const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const DashboardPlugin = require("@module-federation/dashboard-plugin");
const deps = require("../package.json").dependencies;
const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');
const { readFileSync } = require('fs');
const tokens = readFileSync(__dirname + '/../../.env')
    .toString('utf-8')
    .split('\n')
    .map(v => v.trim().split('='));

process.env.DASHBOARD_WRITE_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_WRITE_TOKEN')[1];
process.env.DASHBOARD_BASE_URL = tokens.find(([k]) => k === 'DASHBOARD_BASE_URL')[1];
const devConfig = {
    mode: 'development',
    entry: './src/index',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
    },
    devServer: {
        port: 8085,
        historyApiFallback: {
            historyApiFallback: true,
        },
        static: {
            directory: path.join(__dirname, "../../dist")
        },
    },

    plugins: [
        new ModuleFederationPlugin(
            {
                name: 'theme__REMOTE_VERSION__',
                filename: 'remoteEntry.js',
                exposes: {
                    './theme': './src/shared-theme',
                    './palette': './src/shared-palette',
                    './ReactButton': './src/Button',
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
                    // '@mui/material': {
                    //     singleton: true,
                    //     requiredVersion: deps["@mui/material"]
                    // }
                }
            }
        ),
        new DashboardPlugin({
            versionStrategy: require("../package.json").version,
            filename: 'dashboard.json',
            environment: 'development',
            dashboardURL: `${process.env.DASHBOARD_BASE_URL}/update?token=${process.env.DASHBOARD_WRITE_TOKEN}`,
            metadata: {
                baseUrl: 'http://localhost:8085',
                remote: 'http://localhost:8085/remoteEntry.js',
            },
        }),
        new HtmlWebpackPlugin({
            template:
                './public/index.html',
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);