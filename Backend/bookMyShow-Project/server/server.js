const express = require("express");
const app = express();

require("dotenv").config(); //load .env variables into process.env object
console.log(process.env);

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");

connectDB();

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(8082, () => {
    console.log("Server is Running");
});