// let arr = [12,10,3,4,33]; // [3,4,10,12,33]

// console.log(arr.sort()); //converts each item into string , then sort lexicographically . by default sorting is ascending [10,12, 3, 33, 4 ]

let arr = [
    {"name": "Alice", "ratings":23},
    {"name": "Bob", "ratings":28},
    {"name": "Charlie", "ratings":38},
]

// arr.sort() -> objects-> convert objects in to string -> [Object Object] -> 
// console.log(arr.toString()); 

console.log(arr.sort());

//ascending -> A-B
//descending -> B-A
arr.sort((objA, objB) => {
    return objB.ratings - objA.ratings
})


let name = "HeLLLLoooo"

console.log(name.toLowerCase());
console.log(name.toUpperCase());
 