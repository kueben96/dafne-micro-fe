const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const DashboardPlugin = require("@module-federation/dashboard-plugin");
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')
const path = require('path');
const DASHBOARD_WRITE_TOKEN = "4ef1ef7b-5c18-4aa1-a376-754ec17d83b6"
const DASHBOARD_READ_TOKEN = "cff21df1-7f3f-43de-911e-73e682998569"
// const DASHBOARD_BASE_URL = "http://localhost:3000"
const DASHBOARD_BASE_URL = "https://api.medusa.codes"

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
            directory: path.join(__dirname, "../dist")
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            remotes: {
                theme: 'theme@http://localhost:8085/remoteEntry.js',
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
            dashboardURL: `${DASHBOARD_BASE_URL}/update?token=${DASHBOARD_WRITE_TOKEN}`,
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