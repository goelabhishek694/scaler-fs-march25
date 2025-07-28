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
const password = "VU53NKcgNjEdrtGf";
const mongoose = require("mongoose");
const dbURL = `mongodb+srv://goelabhishek694:${password}@cluster0.qz68wqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURL)
.then((connection) =>{
    console.log("connected to DB");
})
.catch(err =>{
    console.log(err);
});

//schema -> blue print of your collection . 

const productSchema = new mongoose.Schema({
    product_name: {
       type: String,
       required: true
    },
    product_price: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    isInStock: {
        type: Boolean,
        default: true,
    }
}, {timestamps: true});

//model lets us interact with collection . it helps us apply query to retrieve/post/update/delete documents 
const ProductModel = mongoose.model("products", productSchema);

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

app.post("/api/products", loggerMiddleware, async (req,res)=> {
    //data sent by FE to BE is stored in body inside request object
    const body = req.body; 
    const product = await ProductModel.create({
        product_name: body.product_name,
        product_price: body.product_price,
        category: body.category
    });
    console.log(product);
    return res.status(201).json({
        message: "product created"
    });
})

app.get("/api/products", loggerMiddleware, async (req,res)=> {
    const query = req.query;
    console.log(query);
    const products = await ProductModel.find(query);
    // const products = await ProductModel.find({}).where({product_price: {$gte:"50"}});
    console.log(products);
    return res.status(200).json({
        message: "product retrieved",
        data: products
    });
})
app.get("/api/products/:id", loggerMiddleware, async (req,res)=> {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    console.log(product);
    return res.status(200).json({
        message: "product retrieved",
        data: product
    });
});

app.put("/api/products/:id", loggerMiddleware, async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    const product = await ProductModel.findByIdAndUpdate(id, update, {returnDocument:"after"});
    console.log(product);
    return res.status(200).json({
        message: "product updated",
        data: product
    });
})

app.delete("/api/products/:id", loggerMiddleware, async (req, res) => {
     const id = req.params.id;
     const product = await ProductModel.findOneAndDelete({"_id": id});
     return res.status(200).json({
        message: "product deleted",
        data: product
    });
})


app.listen(3000, () => {
    console.log("server started on port 3000");    
})