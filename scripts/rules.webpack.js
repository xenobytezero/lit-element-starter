const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = [

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

]

const plugins = [
    new MiniCssExtractPlugin()
]

// ---------------------------------------------------
// --------------------------------------------------

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

module.exports = {
    rules,
    plugins
}