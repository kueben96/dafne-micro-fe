const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        uniqueName: 'dafne',
        publicPath: "http://localhost:8083/",
    },
    devServer: {
        port: 8083,
        historyApiFallback: {
            historyApiFallback: true,
        },

    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dafne',
            filename: 'remoteEntry.js',
            remotes: {
                theme: 'theme@http://localhost:8085/remoteEntry.js',
                neighborhood: 'neighborhood@http://localhost:8087/remoteEntry.js',
            },
            exposes: {
                './DafneApp': './src/bootstrap'
            },
            shared: {
                ...packageJson.dependencies,
                react: {
                    singleton: true,
                    requiredVersion: packageJson.dependencies.react,
                },
                'react-dom': {
                    requiredVersion: packageJson.dependencies["react-dom"],
                    singleton: true,
                },
                '@mui/material': {
                    singleton: true,
                    requiredVersion: packageJson.dependencies["@mui/material"]
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);