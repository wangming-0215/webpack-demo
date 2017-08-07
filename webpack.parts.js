exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: "errors-only",
        host,
        port,
        overlay: {
            warnings: true,
            errors: true
        }
    }
});

// babel-loader
exports.loadJavaScript = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: "babel-loader",
                options
            }
        ]
    }
});

exports.lintJavaScripe = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                enforce: "pre",
                loader: "eslint-loader",
                options
            }
        ]
    }
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[local]"
                        }
                    }
                ]
            }
        ]
    }
});

// 提取css
const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.extractCSS = ({ include, exclude, use }) => {
    // output extracted css to a file
    const plugin = new ExtractTextPlugin({
        filename: "[name].[contenthash:8].css"
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: plugin.extract({
                        use,
                        fallback: "style-loader"
                    })
                }
            ]
        },
        plugins: [plugin]
    };
};

// 自动添加前缀
exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()]
    }
});

// 处理图片
exports.loadImages = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                include,
                exclude,
                use: {
                    loader: "url-loader",
                    options
                }
            }
        ]
    }
});

// 字体
exports.loadFonts = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                // capture eot, ttf, woff and woff2
                test: /\.(eot|ttf|woff|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
                include,
                exclude,
                use: {
                    loader: "file-loader",
                    options
                }
            }
        ]
    }
});

// source maps
exports.generateSourceMaps = ({ type }) => ({
    devtool: type
});

// CommonChunksPlugin
const webpack = require("webpack");
exports.extractBundles = bundles => ({
    plugins: bundles.map(
        bundle => new webpack.optimize.CommonsChunkPlugin(bundle)
    )
});

// clean webpack plugin
const CleanWebpackPlugin = require("clean-webpack-plugin");

exports.clean = path => ({
    plugins: [new CleanWebpackPlugin([path])]
});

// 添加版本信息
const GitRevisionPlugin = require("git-revision-webpack-plugin");
exports.attachRevision = () => ({
    plugins: [
        new webpack.BannerPlugin({
            banner: new GitRevisionPlugin().version()
        })
    ]
});

// 压缩代码
const BabiliPlugin = require("babili-webpack-plugin");

exports.minifyJavaScript = () => ({
    plugins: [new BabiliPlugin()]
});

// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false
        })
    ]
});
// set environment variables
exports.setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);
    return {
        plugins: [new webpack.DefinePlugin(env)]
    };
};
