const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") { return res.end(); }
    const log = `${Date.now()}:${req.method} ${req.url} New request received\n`;
    const myUrl = url.parse(req.url, true);

    fs.appendFile('log.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                if (req.method === "GET") { res.end("Home Page") };
                break;
            case "/About":
                const userName = myUrl.query.myname;
                res.end(`Hi ${userName}`);
                break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end("here are your results for " + search);
                break;
            case "/signup":
                if (req.method === "GET") { res.end("this is a signup form") }
                else if (req.method === "POST"){
                    //DB QUERY
                    res.end("success");
                }
            default:
                res.end("404, page not found")
        }

    });

});

myServer.listen(3000, () => console.log("server started!"))