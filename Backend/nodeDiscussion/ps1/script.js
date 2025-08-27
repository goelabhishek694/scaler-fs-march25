const fs = require("fs");
const content = Math.random().toString(36).repeat(1000000);
fs.writeFileSync("./big.file", content);