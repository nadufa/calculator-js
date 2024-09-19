const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // Убедитесь, что в вашем HTML шаблоне не присутствует <link> тег для стилей
        }),
        new ESLintPlugin({
            context: path.resolve(__dirname, 'src'),
            extensions: ['js'],
            overrideConfigFile: path.resolve(__dirname, '.eslintrc.js'),
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css', // Временный файл, который будет инлайнится
        }),
        new HtmlInlineCssWebpackPlugin(), // Инлайнит CSS в HTML
    ],
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,
    },
};