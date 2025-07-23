//fs module  -> allows interaction with file-system (read/write)
const fs = require("fs");

fs.readFile("f1.txt", 'utf-8', (err,data) => {
    if(err){
        console.error(err);
        return;
    }
    console.log(data);
});

const content = "Hello World !";
fs.writeFile('example.txt', content, 'utf-8', (err) => {
    if(err){
        console.error(err);
        return;
    }
    console.log("File has been written");
});

//rename a file -> create copy of file 
fs.rename("example.txt", 'new-example.txt', () => {
    console.log("hello");
    
})

//delete a file
fs.unlink('example.txt', () => {
    console.log("bye");
})


//file statistics 
fs.stat('f1.txt', (err,stats) => {
    console.log("size: ", stats.size);
    console.log("is Directory ? ", stats.isDirectory());
})

//creating a directory
fs.mkdir("my-directory", (err) => {});

//deleting a directory
fs.rmdir("my-directory", {recursive: true}, (err) => {});

