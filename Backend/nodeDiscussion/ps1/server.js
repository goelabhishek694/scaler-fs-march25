const http = require('http');
const server = http.createServer();
const fs = require("fs");

server.on("request", (req, res) => {
    fs.readFile("./big.file", (err,data) => {
        if(err) throw err;
        res.end(data);
    })
})

server.listen(3000, () => {
   console.log("Server started at 3000")
})


//solution -> streaming 