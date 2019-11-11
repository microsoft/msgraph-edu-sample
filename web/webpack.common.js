const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

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
            test: /\.(jp?g|png|gif)$/i,
            use: {
                loader: 'url-loader',
                options:{
                    limit: false,
                    name: '[name].[ext]'
                }
            }
        }, {
            test:/\.(jp?g|gif)|(svg)$/i,
            use:{
                loader: 'file-loader',
                options:{
                    name:'[name].[ext]'
                }
            }
        },
        { 
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: false,
            inject:'head',
            template:'./src/index.html',
            filename: './index.html'
        }),
        new WebpackPwaManifest({
            filename: '[name].[ext]',
            dir: "ltr",
            lang: "en",
            name: 'Bellows College',
            short_name: 'Bellows',
            scope: "/",
            display: "standalone",
            start_url: "/",
            description: 'An app for student project managment.',
            background_color: '#5b7ad0',
            crossorigin: '', //can be null, use-credentials or anonymous
            icons: [
                {
                    src: './src/assets/icons/android-launchericon-512-512.png',
                    sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
                }
                   ]}),
        new Dotenv()
    ]
};