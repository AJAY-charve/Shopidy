const express = require("express")
const { getAllProductsAdmin } = require("../controllers/productAdminController")
const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", protect, admin, getAllProductsAdmin)

module.exports = router
