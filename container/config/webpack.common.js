const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    module: {
        resolve: {
            modules: ['node_modules', path.resolve(__dirname, 'src')],
        },
        rules: [
            // loader: tell webpack to process different files as we import them to the project
            {
                // anytime we import a file that ends with .mjs oder .js we want it to be processed by babble
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ]
}