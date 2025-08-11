const express = require('express');
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
const {makePayment} = require("../controller/booking")
// Route to process payment
router.post("/make-payment", makePayment);

module.exports = router;