module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    parser: "babel-eslint",
    extends: "eslint:recommended",
    parserOptions: {
        sourceType: "module",
        allowInportExportEverywhere: true
    },
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "windows"],
        semi: ["error", "always"],
        "no-unused-vars": ["warn"],
        "no-console": 0
    }
};
