const express = require("express")
const multer = require("multer")
const { uploadImage } = require("../controllers/uploadContoller")

const router = express.Router()

// multer setup
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Upload single image
router.post("/", upload.single("image"), uploadImage)

module.exports = router
