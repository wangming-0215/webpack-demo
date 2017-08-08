var fs = require("fs");

fs.mkdir("/dir1", function(err) {
    if (err) throw err;
    console.log("success");
});
