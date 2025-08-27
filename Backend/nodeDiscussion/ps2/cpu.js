const express = require("express");
const app =express();

app.use(express.static("public"));
function calculateFibonacci(num){
    if(num<=1){
        return num
    }
    return calculateFibonacci(num-1) + calculateFibonacci(num-2);
}
app.get('/fib', (req, res) => {
   const { number, requestNumber } = req.query;
   console.log("handler fn ran for req", requestNumber);
   if (!number || isNaN(number) || number <= 0) {
       return res.status(400).json({ error: 'Please provide a valid positive number.' });
   }
   const answer = calculateFibonacci(number);
   // console.log(answer);
   res.status(200).json({
       status: "success",
       message: answer,
       requestNumber
   })
});

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});
