//to create server
const express = require("express");

const app = express();
//when we send data from FE, the data is not parsed correctly 
//to fix this problem , we use middleware 
// parses the incoming JSON and makes it available in req.body
app.use(express.json());

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

app.post("/api/products", (req,res)=> {
    //data sent by FE to BE is stored in body inside request object
    console.log(req.body);
    res.send("Received a POST request");
})


app.listen(3000, () => {
    console.log("server started on port 3000");
    
})