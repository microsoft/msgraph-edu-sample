const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/index.js',
    
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    
    module: {
        rules: [{ 
            test: /\.js$/, 
            use: 'babel-loader' 
        }, {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: {
                    interpolate: true
                }
            }
        }, { 
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        }, { 
            test: /\.scss$/,
            use: [
                { loader: "style-loader" }, // creates style nodes from JS strings
                { loader: "css-loader" }, // translates CSS into CommonJS
                { 
                    loader: "sass-loader",  // compiles Sass to CSS, using Node Sass by default
                    options: {
                        implementation: require("sass")
                    }
                }
            ]
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: './dist/index.html'
        }),
        new Dotenv()
    ]
};