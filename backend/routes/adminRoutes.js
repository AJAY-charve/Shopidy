const express = require("express")
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/adminController")

const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", protect, admin, getAllUsers)
router.post("/", protect, admin, createUser)
router.put("/:id", protect, admin, updateUser)
router.delete("/:id", protect, admin, deleteUser)

module.exports = router
