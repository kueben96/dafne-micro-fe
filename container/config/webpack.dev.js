const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const DashboardPlugin = require("@module-federation/dashboard-plugin");
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')
const Dotenv = require('dotenv-webpack');
const path = require('path');


const DASHBOARD_WRITE_TOKEN = "4ef1ef7b-5c18-4aa1-a376-754ec17d83b6"
const DASHBOARD_READ_TOKEN = "cff21df1-7f3f-43de-911e-73e682998569"
// const DASHBOARD_BASE_URL = "http://localhost:3000"
const DASHBOARD_BASE_URL = "https://api.medusa.codes"
const dashboardURL = `${DASHBOARD_BASE_URL}/env/development/get-remote?token=${DASHBOARD_READ_TOKEN}`;
const devConfig = {

    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        // publicPath: 'auto'
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
            directory: path.join(__dirname, "../dist")
        },
    },
    devtool: 'source-map',

    plugins: [
        new Dotenv({
            path: `../.env`, // Load the .env file based on the environment (e.g., .env.development)
        }),
        new ModuleFederationPlugin({
            name: 'container',
            filename: 'remoteEntry.js',
            remotes: {
                marketing: DashboardPlugin.clientVersion({
                    currentHost: 'container',
                    remoteName: 'marketing',
                    dashboardURL,
                }),
                // marketing: 'marketing@http://localhost:8081/remoteEntry.js',
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
            dashboardURL: `${DASHBOARD_BASE_URL}/update?token=${DASHBOARD_WRITE_TOKEN}`,
            filename: 'dashboard.json',
            metadata: {
                clientUrl: DASHBOARD_BASE_URL,
                baseUrl: 'http://localhost:8080',
                remote: 'http://localhost:8080/remoteEntry.js',
            },
        }),

    ]
}

module.exports = merge(commonConfig, devConfig);