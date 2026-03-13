const express = require("express")
const {
    createCheckout,
    markCheckoutPaid,
    finalizeCheckout
} = require("../controllers/checkoutContoller")

const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", protect, createCheckout)
router.put("/:id/pay", protect, markCheckoutPaid)
router.post("/:id/finalize", protect, finalizeCheckout)

module.exports = router
