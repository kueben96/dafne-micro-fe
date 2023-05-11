module.exports = {

    module: {
        rules: [
            // loader: tell webpack to process different files as we import them to the project
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ["@babel/preset-typescript", "@babel/preset-react", "@babel/preset-env"],
                        "plugins": [
                            ["@babel/transform-runtime"]
                        ]
                    }

                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    }
}