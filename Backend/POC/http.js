const http = require("http");

//create server
// const server = http.createServer((req, res) => {
//     //handle incoming requests here
//     // res.setHeader('Content-Type', 'text/plain');
//     res.setHeader('Content-Type', 'text/html');
//     // res.write("Hello World !!");
//     res.write("<html><head><title>Node.js HTTP Server</title></head><body>");
//   res.write("<h1>Hello, World!!</h1>");
//   res.write("</body></html>");
//     res.end();
// });

const server = http.createServer((req, res) => {
    //handle incoming requests here
    res.setHeader('Content-Type', 'application/json');
    const jsonData = {
        message: "Hello World , BYE!",
        date: new Date()
    };

    const jsonResponse = JSON.stringify(jsonData);
    res.write(jsonResponse);
    res.end();
});

//specify a port and host 
const port = 3000; 
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`server is listening on http://${host}:${port}`);
});