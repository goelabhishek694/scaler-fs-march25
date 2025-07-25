const mongoose = require("mongoose");
const dbURL = `mongodb+srv://goelabhishek694:${password}@cluster0.qz68wqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURL)
.then((connection) =>{
    console.log("connected to DB", connection);
})
.catch(err =>{
    console.log(err);
});