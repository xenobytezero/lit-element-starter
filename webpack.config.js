const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const path = require('path');

const rules = require('./scripts/rules.webpack').rules;
const plugins = require('./scripts/rules.webpack').plugins;

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------


// ----------------------------------------------------------

module.exports = env => {
    return ({
        mode: env.MODE,
        entry: [
            './src/appRoot.component.ts',
            './sass/index.scss'
        ],
        devtool: env.MODE === 'development' ? 'inline-source-map' : 'none',
        devServer: {
            contentBase: './dist',
            writeToDisk: true
        },
        module: {
            rules: rules.concat([{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }]),
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        stats: {
            colors: true
        },
        plugins: plugins.concat([
            new HtmlWebpackPlugin({
                inject: 'head',
                template: 'public/index.html',
                base: '/'
            }),
            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /node_modules/,
                // add errors to webpack instead of warnings
                failOnError: true,
                // allow import cycles that include an asyncronous import,
                // e.g. via import(/* webpackMode: "weak" */ './file.js')
                allowAsyncCycles: false,
                // set the current working directory for displaying module paths
                cwd: process.cwd(),
              })
        ]),
        performance: {
            hints: false
        }
    });
};