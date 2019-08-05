module.exports = {
    mode: 'development',
    entry: {
        main: './assets/js/index.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/public/js'
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    {
                        loader: 'sass-loader', options: {
                            implementation: require('sass')
                        }
                    },

                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '../images/[hash].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};