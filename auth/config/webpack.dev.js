const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const DashboardPlugin = require("@module-federation/dashboard-plugin");
const commonConfig = require('./webpack.common');
const deps = require("../package.json").dependencies;
const path = require('path');
const { readFileSync } = require('fs');
const tokens = readFileSync(__dirname + '/../../.env')
    .toString('utf-8')
    .split('\n')
    .map(v => v.trim().split('='));

process.env.DASHBOARD_WRITE_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_WRITE_TOKEN')[1];
process.env.DASHBOARD_BASE_URL = tokens.find(([k]) => k === 'DASHBOARD_BASE_URL')[1];
process.env.DASHBOARD_READ_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_READ_TOKEN')[1];
const dashboardURL = `${process.env.DASHBOARD_BASE_URL}/env/development/get-remote?token=${process.env.DASHBOARD_READ_TOKEN}`;
const devConfig = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
    },
    devServer: {
        port: 8082,
        historyApiFallback: {
            historyApiFallback: true,
        },
        static: {
            directory: path.join(__dirname, "../../dist")
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'auth__REMOTE_VERSION__',
            filename: 'remoteEntry.js',
            remotes: {
                theme: DashboardPlugin.clientVersion({
                    currentHost: 'auth',
                    remoteName: 'theme',
                    dashboardURL,
                }),
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
            }
        }),
        new DashboardPlugin({
            versionStrategy: `${Date.now()}`,
            filename: 'dashboard.json',
            environment: 'development',
            dashboardURL: `${process.env.DASHBOARD_BASE_URL}/update?token=${process.env.DASHBOARD_WRITE_TOKEN}`,
            metadata: {
                baseUrl: 'http://localhost:8082',
                remote: 'http://localhost:8082/remoteEntry.js',
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);