//to create server
const express = require("express");

const app = express();
//when we send data from FE, the data is not parsed correctly 
//to fix this problem , we use middleware 
// parses the incoming JSON and makes it available in req.body
//global middleware
app.use(express.json());

//serve static files like html ,css, js images 
app.use(express.static("public"));

const loggerMiddleware = (req, res ,next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
}

// app.use(loggerMiddleware);

app.get("/search/:id/:brand", (req, res) => {
    const pathParams = req.params;
    console.log(pathParams);
    // { id: 'mobile', brand: 'samsung' }
    const {id, brand} = pathParams;
    // use params 
    const queryParams = req.query;
    console.log(queryParams);
    // { price: 'asc', discount: 'lth', page: '2' }
    res.send("hello world")
})

app.post("/api/products", loggerMiddleware, (req,res)=> {
    //data sent by FE to BE is stored in body inside request object
    console.log(req.body);
    res.send("Received a POST request");
})


app.listen(3000, () => {
    console.log("server started on port 3000");
    
})