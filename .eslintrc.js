module.exports = {
    globals: {
        __: true
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        mocha: true
    },
    parser: "babel-eslint",
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: true,
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ["react"],
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "windows"],
        semi: ["error", "always"],
        "no-unused-vars": ["warn"],
        "no-console": 0
    }
};
