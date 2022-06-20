const express = require("express");
const router = express.Router();

// middleware
const { auth, adminCheck } = require("../middleware/auth");

// controllers
const { changeOrderStatus,getOrderAdmin } = require('../controllers/admin')


//@Endpoint  http://localhost:5000/api/admin/order-status
//@Method    PUT
//@Access    Private
router.put("/admin/order-status", auth, changeOrderStatus);
router.get("/admin/orders", auth, getOrderAdmin);




module.exports = router;
