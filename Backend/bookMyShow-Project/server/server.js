const express = require("express");
const cookierParser = require("cookie-parser");
const app = express();

require("dotenv").config(); //load .env variables into process.env object

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");

connectDB();

app.use(cookierParser());
app.use(express.json());



app.use("/api/users", userRouter);

//404 route, always keep at last
app.use((req, res, next) => {
    res.status(404).send("page not found");
});

app.listen(8082, () => {
    console.log("Server is Running");
});