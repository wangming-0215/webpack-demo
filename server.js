const express = require("express");
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const app = express();

app.use(
    webpackMiddleware(
        webpack({
            entry: {
                app: path.resolve(__dirname, "app")
            },
            output: {
                path: path.resolve(__dirname, "build"),
                filename: "[name].js",
                publicPath: "/"
            },
            plugins: [
                new HtmlWebpackPlugin({
                    title: "Webpack Demo"
                })
            ]
        })
    )
);

app.listen(8080, "localhost", function(err) {
    if (err) return;
    console.log("server on http://localhost:8080");
});
