const path = require("path");

const config = {
    target: "web",
    entry: path.join(__dirname, '../src/index.js'),  // 可设置默认值，后续配置文件可进行覆盖
    output: {
        filename: "bundle[hash:8].js",
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
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
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
                            sourceMap: true
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
                            limit: 1024,        // 图片大小限制
                            name: 'resources/[path][name]-[hash].[ext]'
                        }
                    }
                ]
            },

        ]
    }
}


module.exports = config;