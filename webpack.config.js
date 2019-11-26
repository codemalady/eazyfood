const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/js/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new htmlWebpackPlugin({
            filename: 'dashboard.html',
            template: './src/pages/dashboard.html'
        }),
        new htmlWebpackPlugin({
            filename: 'favorites.html',
            template : './src/pages/favorites.html'
        }),
        new htmlWebpackPlugin({
            filename: 'orders.html',
            template : './src/pages/orders.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            }
        ]
    },
    node: {
        fs: "empty"
    }
}