// const {exec} = require("child_process");

// reading all the files (ls) in long (l) human readable file sizes(h)
                //if the command fails , output data of files , any error message produced by the command
// exec('ls -lh', (error, stdout, stderr) => {
//     if(error){
//         console.error("exec error ", error);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);
// });

// exec('grep "someText" randomFile.txt' ,(err,stdout,stderr)=>{
//    if (err) {
//        console.error(`exec error: ${err.message}`);
//        if (stderr) {
//            console.error(`stderr: ${stderr}`);
//        }
//        return;
//    }
//    console.log(`Number of files ${stdout}`);
// })

// exec('somerandomcommand',(err,stdout,stderr)=>{
//    if(err){
//        console.error(`exec error: ${err}`);
//        return;
//    }
//    console.log(`Number of files ${stdout}`);
//    console.error(`stderr: ${stderr}`);
// })



// const { execFile } = require('child_process');

// // The path to the script file
// const scriptPath = './script.sh'; // Use 'script.bat' for Windows

// // Arguments to pass to the script
// const args = ['arg1', 'arg2'];

// // Executing the script with arguments
// execFile(scriptPath, args, (error, stdout, stderr) => {
//    if (error) {
//        console.error(`Execution error: ${error}`);
//        return;
//    }
//    console.log(`stdout: ${stdout}`);
//    console.error(`stderr: ${stderr}`);
// });

//spawn -> used to run idff programs 
// spawn -> creates a new child process and streams the output and error streams of the process back to parent process 
// use cases -> when we need t0 run a command line tool or script that is not a nodejs module 
// suitable for log processing , image pricessing 

//fork 
// purpose : the fork method is a special case of spawn function. it is specifically used to create a new instance of nodejs runtime to run a module in a new process. 
// it is a copy of parent process , inclusing parent's memory and runtime
// IPC -> inter porcess communication b/w parent and child process. 
//fork creates a copy of parent process, spawn creates a new copy from scratch 
// Use Cases:
// When you need to execute a heavy task written in Node.js and don't want it to block the event loop in the main process.
// When you need the child process to execute Node.js code and you want to communicate with the child process from the parent process.

// Fork vs spawn
// a) We Use fork when you need to create a new Node.js process that shares some or all of the parent process’s memory and runtime environment, and when you need to communicate between the parent and child processes using IPC. eg running a cpu intensive task
// b) We Use spawn when you need to spawn a new process / program and stream its output and error streams back to the parent process. Basically just get the work done and report its status
// c) fork and spawn differ in communication style:
// Imagine two teams working on a project:
// Spawn (Email Communication): One team uses only emails (standard input/output streams) to communicate. They send detailed instructions and get back a report when the task is done. This is like spawn, which is good for tasks that don't need back-and-forth discussion.
// Fork (Instant Messaging): The other team uses instant messaging (IPC channel) for quick, two-way chats. They can send messages, get immediate responses, and adjust their requests on the fly. This is like fork, beneficial for tasks that need ongoing conversation and immediate feedback.

const {spawn} = require('child_process');

spawn("/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome", ["https://www.youtube.com/", "--incognito"]);

