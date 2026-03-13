const User = require("../models/User")
const generateToken = require("../utils/generateToken")
const bcrypt = require("bcryptjs")

// Register new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new User({ name, email, password: hashedPassword })
        await user.save()

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid credentials" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

        const token = generateToken(user)

        res.json({
            message: "User loggedin successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

// Get user profile
const getUserProfile = async (req, res) => {
    res.json({
        message: "Fetch user profile",
        user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
}
