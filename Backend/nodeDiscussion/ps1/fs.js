const { log, error } = require("console");
const fs = require("fs");
const path = require("path");
// const content = Math.random().toString(36).repeat(10000000);
// fs.writeFileSync("./bigs.file", content);

const filePath = path.join(__dirname, 'bigs.file');
console.log(filePath);
//streams in nodejs inherently use event emitter class
// const readableStream = fs.createReadStream(filePath);
// readableStream.on('data', (chunk)=>{
//     console.log(`received ${chunk.length} bytes of data`);
//     // console.log(chunk.toString());
// })

// readableStream.on('end', () => {
//     console.log("finished reading file");  
// });

// readableStream.on('error', (err) => {
//     console.log("error reading file", err);  
// });

//write a file 
// const writableStream = fs.createWriteStream("copyOfBig.file");
// readableStream.on("data", (chunk) => {
//     writableStream.write(chunk);
// });

// readableStream.on('end', () => {
//     console.log("finished reading file");  
//     writableStream.end();
// });


//pipe - is a method on readbale streams and is used to coneact a readable stream to a writable stream. it automaticaly handles the data to transfer from readable to writable stream. 

const readableStream = fs.createReadStream(filePath);
const writableStream = fs.createWriteStream("anotherCopyOfBig.file");

readableStream.pipe(writableStream);

readableStream.on("error", (err) => {
    console.log("error while reading", err);
})

writableStream.on("error", (err) => {
    console.log("error while writing", err);
})

