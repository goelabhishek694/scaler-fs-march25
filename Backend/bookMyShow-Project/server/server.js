const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

require("dotenv").config(); //load .env variables into process.env object

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");

connectDB();

app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);

//404 route, always keep at last
app.use((req, res, next) => {
    res.status(404).send("page not found");
});

app.listen(8082, () => {
    console.log("Server is Running");
});