const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                // test: /\.(png|jpe?g|gif)$/i,
                // // use: [
                // //     {
                // //         loader: 'file-loader',
                // //     },
                // // ],
                // loader: 'file-loader',
                // options: {
                //     // name: '[path][name].[ext]',
                //     name: '[name].[ext]',
                //     outputPath: 'assets/img'
                // },
            },
        ]
    },
    optimization: {

    },
    plugins: [
        new HtmlWebPack({
            title: 'Mi first webpack app',
            // filename: 'index.html' // Default is index.html,
            template: './src/index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            // filename: 'bundle.css',
            // filename: '[name][fullhash].css',
            filename: 'bundle.css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/assets/img", to: "assets/img" },
            ],
        }),
    ]
}