const express = require("express");
const {fork} = require("child_process");
const path = require("path");

const app =express();
app.use(express.static("public"));

app.get('/fib', (req, res) => {
   const { number, requestNumber } = req.query;
   console.log("handler fn ran for req", requestNumber);
   if (!number || isNaN(number) || number <= 0) {
       return res.status(400).json({ error: 'Please provide a valid positive number.' });
   }
//    const answer = calculateFibonacci(number);
//creating a child process
const fiboRes = fork(path.join(__dirname, 'fiboWorker.js'));
//parent sends a message to child 
fiboRes.send({number: parseInt(number, 10)});
//receiving data from child process
fiboRes.on("message", (answer) => {
    console.log("sending response for req ", requestNumber);
    res.status(200).json({
       status: "success",
       message: answer,
       requestNumber
   });
   //kill the child process
    fiboRes.kill();
})


   // console.log(answer);
//    res.status(200).json({
//        status: "success",
//        message: answer,
//        requestNumber
//    })
});

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});
