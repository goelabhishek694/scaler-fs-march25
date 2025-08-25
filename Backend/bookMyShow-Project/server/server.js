const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const app = express();

require("dotenv").config(); //load .env variables into process.env object

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");
const bookingRouter = require("./routes/bookingRoute");
const showRouter = require("./routes/showRoute");

connectDB();
const apiLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message: "Too many requests from this IP, plsease try again after 15 minutes."
});
app.use("/api",apiLimiter);
app.use(helmet());
app.use(
 helmet.contentSecurityPolicy({
   directives: {
     defaultSrc: ["'self'"],
     scriptSrc: ["'self'"],
     styleSrc: ["'self'", "https://fonts.googleapis.com"],
     imgSrc: ["'self'", "data:"],
     connectSrc: ["'self'"],
     fontSrc: ["'self'", "https://fonts.gstatic.com"],
     objectSrc: ["'none'"],
   },
 })
);
// By default, $ and . characters are removed completely from user-supplied input in the following places:
// - req.body
// - req.params
// - req.headers
// - req.query

// To remove data using these defaults:
app.use(mongoSanitize());
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/booking", bookingRouter);

//404 route, always keep at last
app.use((req, res, next) => {
    res.status(404).send("page not found");
});

app.listen(8082, () => {
    console.log("Server is Running");
});