const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        uniqueName: 'container',
        publicPath: '/'
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            historyApiFallback: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
    devtool: 'source-map',

    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dafne: 'dafne@http://localhost:8083/remoteEntry.js',
                landing: 'landing@http://localhost:8084/_next/static/chunks/remoteEntry.js',
            },
            shared: {
                ...packageJson.dependencies,
                react: {
                    // eager: true,
                    requiredVersion: false,
                    singleton: true,
                },
            }
        })
    ]
}

module.exports = merge(commonConfig, devConfig);