const {exec} = require("child_process");
const { error } = require("console");

// reading all the files (ls) in long (l) human readable file sizes(h)
                //if the command fails , output data of files , any error message produced by the command
exec('ls -lh', (error, stdout, stderr) => {
    if(error){
        console.error("exec error ", error);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});

exec('grep "someText" randomFile.txt' ,(err,stdout,stderr)=>{
   if (err) {
       console.error(`exec error: ${err.message}`);
       if (stderr) {
           console.error(`stderr: ${stderr}`);
       }
       return;
   }
   console.log(`Number of files ${stdout}`);
})

exec('somerandomcommand',(err,stdout,stderr)=>{
   if(err){
       console.error(`exec error: ${err}`);
       return;
   }
   console.log(`Number of files ${stdout}`);
   console.error(`stderr: ${stderr}`);
})