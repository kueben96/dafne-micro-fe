const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require("../package.json").dependencies;
const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');

const devConfig = {
    mode: 'development',
    entry: './src/index',
    devServer: {

        port: 8085,
    },
    output: {
        uniqueName: 'theme',
        publicPath: 'http://localhost:8085/',
    },


    plugins: [
        new ModuleFederationPlugin(
            {
                name: 'theme',
                // library: { type: 'var', name: 'theme' },
                filename: 'remoteEntry.js',
                exposes: {
                    './theme': './src/shared-theme',
                    './palette': './src/shared-palette',
                    './ReactButton': './src/Button',
                },
                // shared: {
                //     ...deps,
                //     // react: {
                //     //     singleton: true,
                //     //     requiredVersion: deps.react,
                //     // },
                //     // 'react-dom': {
                //     //     requiredVersion: deps["react-dom"],
                //     //     singleton: true,
                //     // },
                //     '@mui/material': {
                //         singleton: true,
                //         requiredVersion: deps["@mui/material"]
                //     }
                // }
            }
        ),
        new HtmlWebpackPlugin({
            template:
                './public/index.html',
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);