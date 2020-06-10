const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractPlugin = require("extract-text-webpack-plugin");
const baseConfig = require("./webpack.config.base");

// 设置的环境变量都存在于process里面
const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
    // 设置打包时对应vue的版本 DefinePlugin 最为常用的用途就是用来处理我们开发环境和生产环境的不同，
    // debug 的功能在生产环境中需要关闭、开发环境中和生产环境中 api 地址的不同
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"' // 判断优化打包源码 vue、react、angular 等第三方插件库
        }
    }),
    new HTMLPlugin(
        {
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }
    )
]

const devServer = {
    port: '8000',
    host: '0.0.0.0',
    overlay: {
        errors: true,
    },
    hot: true,
}

if (isDev) {
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/index.js'),  // 可设置默认值，后续配置文件可进行覆盖
            vender: 'vue'
        },
        output: {
            filename: "[name].[chunkhash:8].js",
            path: path.join(__dirname, "../dist")
        },
        module: {
            rules: [
                {
                    test: /\.styl$/,
                    use: ExtractPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            "css-loader",
                            {
                                loader: "postcss-loader",
                                options: {
                                    sourceMap: true
                                }
                            },
                            "stylus-loader"
                        ]
                    })
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vender'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    });
}

module.exports = config;