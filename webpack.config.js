const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CircularDependencyPlugin = require('circular-dependency-plugin');

const path = require('path');

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

function createSassLoaderOptions() {
    return {
        implementation: require('sass'),
        sassOptions: {
            includePaths: [
                "./sass"
            ]
        }
    }
}

// ----------------------------------------------------------

module.exports = (env, argv) => {
    return ({
        mode: argv.mode,
        entry: [
            './src/appRoot.view.ts',
            './sass/index.scss'
        ],
        devtool: argv.mode === 'development' ? 'inline-source-map' : 'cheap-module-source-map',
        devServer: {
            contentBase: './dist',
            writeToDisk: true
        },
        module: {
            rules: [

                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },

                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader',
                        options: {

                        },
                    },
                },

                {
                    test: /\.scss$/,
                    exclude: [
                        /\.component\.scss$/
                    ],
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../assets'
                            }
                        },
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: createSassLoaderOptions()
                        }
                    ],
                },
                {
                    test: /\.component\.scss$/,
                    use: [
                        {
                            loader: 'lit-scss-loader',
                            options: {
                                minify: true, // defaults to false
                            },
                        },
                        'extract-loader',
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: createSassLoaderOptions()
                        }
                    ],
                },

                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                            }
                        },
                        'css-loader'
                    ],
                },

                {
                    test: /\.(png|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                            },
                        },
                    ],
                },

            ],
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
        plugins: [
            new HtmlWebpackPlugin({
                inject: 'head',
                template: 'public/index.html',
                base: '/'
            }),
            new MiniCssExtractPlugin(),
            //new CircularDependencyPlugin({
            //    // exclude detection of files based on a RegExp
            //    exclude: /node_modules/,
            //    // add errors to webpack instead of warnings
            //    failOnError: true,
            //    // allow import cycles that include an asyncronous import,
            //    // e.g. via import(/* webpackMode: "weak" */ './file.js')
            //    allowAsyncCycles: false,
            //    // set the current working directory for displaying module paths
            //    cwd: process.cwd(),
            //})
        ],
        performance: {
            hints: false
        }
    });
};