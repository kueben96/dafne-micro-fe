const { merge } = require('webpack-merge');
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
process.env.DASHBOARD_READ_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_READ_TOKEN')[1];
process.env.DASHBOARD_WRITE_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_WRITE_TOKEN')[1];
process.env.DASHBOARD_BASE_URL = tokens.find(([k]) => k === 'DASHBOARD_BASE_URL')[1];

const dashboardURL = `${process.env.DASHBOARD_BASE_URL}/env/development/get-remote?token=${process.env.DASHBOARD_READ_TOKEN}`;
const devConfig = {

    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            historyApiFallback: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        static: {
            directory: path.join(__dirname, "../../dist")
        },
    },
    devtool: 'source-map',

    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            filename: 'remoteEntry.js',
            remotes: {
                marketing: DashboardPlugin.clientVersion({
                    currentHost: 'container',
                    remoteName: 'marketing',
                    dashboardURL,
                }),
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dafne: 'dafne@http://localhost:8083/remoteEntry.js',
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
            dashboardURL: `${process.env.DASHBOARD_BASE_URL}/update?token=${process.env.DASHBOARD_WRITE_TOKEN}`,
            filename: 'dashboard.json',
            metadata: {
                clientUrl: process.env.DASHBOARD_BASE_URL,
                baseUrl: 'http://localhost:8080',
                remote: 'http://localhost:8080/remoteEntry.js',
            },
        }),

    ]
}

module.exports = merge(commonConfig, devConfig);