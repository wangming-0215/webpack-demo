module.exports = config => {
    const tests = "tests/*.test.js";
    config.set({
        frameworks: ["mocha"],
        files: [
            {
                pattern: tests
            }
        ],
        //preprocess through webpack
        preprocessors: {
            [tests]: ["webpack"]
        },
        singleRun: true
    });
};
