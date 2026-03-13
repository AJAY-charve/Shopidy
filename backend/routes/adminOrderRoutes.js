const express = require("express")
const {
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} = require("../controllers/adminOrderController")

const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", protect, admin, getAllOrders)
router.put("/:id", protect, admin, updateOrderStatus)
router.delete("/:id", protect, admin, deleteOrder)

module.exports = router
