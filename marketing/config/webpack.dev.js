const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const DashboardPlugin = require("@module-federation/dashboard-plugin");
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')
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
        // publicPath: "auto",
    },
    cache: false,
    devServer: {
        port: 8081,
        historyApiFallback: {
            historyApiFallback: true,
        },
        static: {
            directory: path.join(__dirname, "../../dist")
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing__REMOTE_VERSION__',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            remotes: {
                theme: DashboardPlugin.clientVersion({
                    currentHost: 'marketing',
                    remoteName: 'theme',
                    dashboardURL,
                }),
            },
            shared: {
                ...packageJson.dependencies,
                react: {
                    // eager: true,
                    requiredVersion: false,
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
                baseUrl: 'http://localhost:8081',
                remote: 'http://localhost:8081/remoteEntry.js',
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);