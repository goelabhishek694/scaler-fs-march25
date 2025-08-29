function calculateFibonacci(num){
    if(num<=1){
        return num
    }
    return calculateFibonacci(num-1) + calculateFibonacci(num-2);
}

process.on("message", ({number}) => {
    console.log(number);
    console.log(typeof number);
    const result = calculateFibonacci(number);
    console.log("hello", result);
    process.send(result);
});