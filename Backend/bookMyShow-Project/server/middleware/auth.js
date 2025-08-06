const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    try{
        // const token = req.cookies.token;
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("hello", verifiedToken);
        req.userId = verifiedToken.userId;
        next();
    }catch(err){
        console.log(err);
        
        res.status(401).send({success: false, message: "Token invalid"})
    }
}