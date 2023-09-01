const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const deps = require("./package.json").dependencies;
module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        // static: {
        //     directory: path.join(__dirname, 'dist'),
        // },
        historyApiFallback: {
            historyApiFallback: true,
        },
        port: 8085,
    },
    resolve: {
        modules: ["src", "node_modules"],
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
                test: /\.m?js$/,

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
                // library: { type: 'var', name: 'theme' },
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
                }
            }
        ),
        new HtmlWebpackPlugin({
            template:
                './public/index.html',
        }),
    ],
};