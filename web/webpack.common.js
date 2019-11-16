const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },  
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [{ 
            test: /\.(ts|js)$/,
            exclude: /node_modules/,
            use: 'babel-loader' 
        }, {
            test: /\.html$/,
            loader: 'html-loader'
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
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Bellows'
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
                    src: './assets/icons/android-launchericon-512-512.png',
                    sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
                }
                   ]}),
        new Dotenv()
    ]
};