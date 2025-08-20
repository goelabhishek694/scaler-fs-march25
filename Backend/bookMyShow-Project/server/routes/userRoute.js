const router = require("express").Router();
const {registerUser, loginUser, currentUser, forgetPassword, resetPassword} = require("../controller/user");
const authMiddleware = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-current-user", authMiddleware, currentUser);
router.patch("/forgetpassword", forgetPassword);
router.patch("/resetpassword/:email", resetPassword);

module.exports = router;

