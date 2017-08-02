const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const parts = require("./webpack.parts");

const PATHS = {
    app: path.resolve(__dirname, "app"),
    build: path.resolve(__dirname, "build")
};

// module.exports = {
//     // Entries have to resolve to files! They rely on Node
//     // convention by default so if a directory contains *index.js*,
//     // it resolves to that.
//     entry: {
//         app: PATHS.app
//     },
//     output: {
//         path: PATHS.build,
//         filename: "[name].js"
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             title: "Webpack Demo"
//         })
//     ]
// };

const commonConfig = merge([
    {
        // Entries have to resolve to files! They rely on Node
        // convention by default so if a directory contains *index.js*,
        // it resolves to that.
        entry: {
            app: PATHS.app
        },
        output: {
            path: PATHS.build,
            filename: "[name].js",
            publicPath: "/"
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack Demo"
            })
        ]
    },
    parts.lintJavaScripe({ include: PATHS.app }),
    // parts.loadCSS()
    parts.loadFonts({
        options: {
            name: "[name].[ext]"
        }
    })
]);

const productionConfig = merge([
    // {
    //     entry: {
    //         vendor: ["react"]
    //     }
    //     // plugins: [
    //     //     new webpack.optimize.CommonsChunkPlugin({
    //     //         name: "vendor"
    //     //     })
    //     // ]
    // },
    parts.extractCSS({ use: ["css-loader", parts.autoprefix()] }),
    parts.loadImages({
        options: {
            limit: 15000,
            name: "[name].[ext]"
        }
    }),
    parts.generateSourceMaps({ type: "source-map" }),
    // minChunks
    // resource represents the path of the full path of the resource being imported. Example: .../webpack-demo/node_modules/purecss/build/pure-min.css.
    // context returns the path to the directory in which the resource is. Example: .../webpack-demo/node_modules/purecss/build.
    // rawRequest contains the whole unresolved request. Example: !!../../css-loader/index.js!.../pure-min.css.
    // userRequest is a version of the request that has been resolved to a query. Example: .../node_modules/css-loader/index.js!.../pure-min.css.
    // chunks tells in which chunks the module is contained. Check chunks.length to tell how many times webpack has included it to control output on the chunk level.
    parts.extractBundles([
        {
            name: "vendor",
            minChunks: ({ resource }) =>
                resource &&
                resource.indexOf("node_modules") >= 0 &&
                resource.match(/\.js$/)
        }
    ]),
    parts.clean(PATHS.build),
    parts.attachRevision()
]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
    }),
    parts.loadCSS(),
    {
        output: {
            devtoolModuleFilenameTemplate: "webpack:/"
        }
    },
    parts.generateSourceMaps({ type: "cheap-module-eval-source-map" })
]);

// const developmentConfig = () => {
//     const config = {
//         module: {
//             rules: [
//                 {
//                     test: /\.js$/,
//                     enforce: 'pre',
//                     loader: 'eslint-loader',
//                     options: {
//                         emitWarning: true,
//                     },
//                 },
//             ],
//         },
//         devServer: {
//             // overlay: true is equivalent
//             overlay: {
//                 errors: true,
//                 warnings: true,
//             },
//             // Enable history API fallback so HTML5 History API based
//             // routing works. Good for complex setups
//             historyApiFallback: true,
//             // Display only errors to reduce the amount of output.
//             stats: 'errors-only',
//             // Parse host and port from env to allow customization.
//             //
//             // If you use Docker, Vagrant or Cloud9, set
//             // host: options.host || '0.0.0.0';
//             //
//             // 0.0.0.0 is available to all network devices
//             // unlike default `localhost`.
//             host: process.env.HOST,
//             port: process.env.PORT,
//         },
//     };

//     return Object.assign({}, commonConfig, config);
// };

module.exports = env => {
    // console.log("env:", env);
    // return commonConfig;
    if (env === "production") {
        return merge(commonConfig, productionConfig);
    }
    return merge(commonConfig, developmentConfig);
};
