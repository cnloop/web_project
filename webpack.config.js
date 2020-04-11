const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let os = require('os');
let ifaces = os.networkInterfaces();
let host;
for (var dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
        if (details.family == 'IPv4' && details.address.indexOf('127') == -1) {
            return host = details.address
        }
    });
}

module.exports = {
    "mode": "development",
    // "mode": "production",
    entry: path.resolve(__dirname, './src/js/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: './' // 只是规定静态文件的前缀
    },
    //  devServer 主要是将项目资源文件生成到内存中
    devServer: {
        contentBase: path.join(__dirname, './happy.html'),
        publicPath: '/dev/', // 只是规定所有静态文件输出的路径
        host: host,
        open: true
    },
    plugins: [
        // HtmlWebpackPlugin 功能点==》1.从template配置中html复制文件到内存中 2.自动将bundle文件引入html文件
        new HtmlWebpackPlugin({ template: './src/index.html', filename: 'happy.html' }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "postcss-loader",
                    options: {
                        ident: 'postcss',
                        plugins: [
                            require('autoprefixer'),
                        ]
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",// creates style nodes from JS strings
                    "css-loader", "less-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer'),
                            ]
                        }
                    }]
            },
            {
                test: /\.(svg.ttf.png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/transform-runtime', '@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    }
}