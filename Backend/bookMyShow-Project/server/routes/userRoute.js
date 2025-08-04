const router = require("express").Router();
const {registerUser, loginUser, currentUser} = require("../controller/user");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/get-current-user", authMiddleware, currentUser);

module.exports = router;

