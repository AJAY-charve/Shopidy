const express = require("express")
const {
    subscribeNewsletter
} = require("../controllers/subscribeController")

const router = express.Router()

// subscribe newsletter (public)
router.post("/subscribe", subscribeNewsletter)

module.exports = router
