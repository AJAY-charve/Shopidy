const jwt = require("jsonwebtoken")

// helper function to generate JWT
const generateToken = (user) => {
    const payload = { user: { id: user._id, role: user.role } }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" })
}

module.exports = generateToken