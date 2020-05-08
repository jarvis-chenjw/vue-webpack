const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack  = require("webpack");

// 设置的环境变量都存在于process里面
const isDev = process.env.NODE_ENV === 'development';
const config = {
    target: "web",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader"
            },
            {
                test: /\.css/,
                use: [
                    "style-loader",     // css代码以js展示
                    "css-loader"
                ]
            },
            {
                test: /\.styl/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap:  true
                        }
                    },
                    "stylus-loader"
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)/,
                use: [
                    {
                        loader: "url-loader",   // 图片转base64放到js里面(url-loader依赖file-loader)
                        options: {
                            // limit: 1024,        // 图片大小限制
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            
        ]
    },
    plugins: [
        // 设置打包时对应vue的版本
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev? '"development"': '"production"'
            }
        }),
        new HTMLPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
}

if (isDev) {
    config.devtool = "#cheap-module-eval-source-map";
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        hot: true,
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;