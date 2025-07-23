// path -> handling and transforming of files and directory paths
// crucial for working with file system and amanging cross platform path differences. ,


const path = require("path");


const fullPath = path.join("folder", "subfolder", "abc.html");
console.log(fullPath); // folder/subfolder/abc.html

const absolutePath = path.resolve("folder", "subfolder", "abc.html");
console.log(absolutePath); //  /Users/abhishekgoel/scaler-fs-march25/Backend/POC/folder/subfolder/abc.html
 
const fileName = path.basename(fullPath);
console.log(fileName); //abc.html

const extension = path.extname(fullPath);
console.log(extension); //.html


