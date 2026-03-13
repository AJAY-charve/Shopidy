const express = require("express")
const {
    getMyOrders,
    getOrderById
} = require("../controllers/orderController")

const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/my-orders", protect, getMyOrders)
router.get("/:id", protect, getOrderById)

module.exports = router
