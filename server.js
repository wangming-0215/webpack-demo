const express = require("express");
const { renderToString } = require("react-dom/server");

const SSR = require("./static");

server(process.env.PORT || 8080);

function server(port) {
    const app = express();
    app.use(express.static("static"));
    app.get("/", (req, res) => {
        res.status(200).send(renderMarkUpToString(renderToString(SSR)));
    });
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
        process.send && process.send("online");
    });
}

function renderMarkUpToString(html) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>React ssr</title>
</head>
<body>
    <div id='app'>${html}</div>
    <script src="${process.env.BROWSER_REFRESH_URL}"></script>
</body>
</html>`;
}
