const router = require("express").Router();
const {registerUser, loginUser, currentUser} = require("../controller/user");
const authMiddleware = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-current-user", authMiddleware, currentUser);

module.exports = router;

