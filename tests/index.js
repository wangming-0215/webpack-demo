// skip execution in node
if (module.hot) {
    const context = require.context(
        "mocha-loader!./", // process through mocha-loader
        false, // skip recursive processing
        /\.test.js$/ // pick any files ending with .test.js
    );

    // execute each test suite
    context.keys().forEach(context);
}
