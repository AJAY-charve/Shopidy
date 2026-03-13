const express = require("express")
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
    getBestSeller,
    getNewArrivals,
    getSimilarProducts
} = require("../controllers/productController")

const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

// ================= ADMIN ROUTES =================

// create product
router.post("/", protect, admin, createProduct)

// update product
router.put("/:id", protect, admin, updateProduct)

// delete product
router.delete("/:id", protect, admin, deleteProduct)

// ================= PUBLIC ROUTES =================

// get all products (with filters)
router.get("/", getProducts)

// best seller
router.get("/best-seller", getBestSeller)

// new arrivals
router.get("/new-arrivals", getNewArrivals)

// similar products
router.get("/similar/:id", getSimilarProducts)

// get product by id
router.get("/:id", getProductById)

module.exports = router
