const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 8085,
    },
    output: {
        uniqueName: 'theme',
        publicPath: 'http://localhost:8085/',
    },
    module: {
        rules: [
            {
                /* The following line to ask babel 
                     to compile any file with extension
                     .js */
                test: /\.js?$/,

                /* exclude node_modules directory from babel. 
                    Babel will not compile any files in this directory*/
                exclude: /node_modules/,

                // To Use babel Loader
                loader:
                    'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
                        '@babel/preset-react',
                    ], // to compile react to ES5
                },
            },
        ],
    },

    plugins: [
        new ModuleFederationPlugin(
            {
                name: 'theme',
                library: { type: 'var', name: 'theme' },
                filename: 'remoteEntry.js',
                exposes: {
                    './theme': './src/shared-theme',
                    './palette': './src/shared-palette',
                    './ReactButton': './src/Button',
                },
                shared: {
                    react: {
                        singleton: true,
                        version: '0',
                        requiredVersion: false,
                    },
                    'react-dom': {
                        requiredVersion: false,
                        singleton: true,
                        version: '0',
                    },
                    '@mui/material': {
                        singleton: true, // Ensure only one instance is loaded
                    },
                }
            }
        ),
        new HtmlWebpackPlugin({
            template:
                './public/index.html',
        }),
    ],
};