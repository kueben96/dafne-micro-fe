module.exports = {
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
    }
}