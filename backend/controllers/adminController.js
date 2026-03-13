const User = require("../models/User")

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit

        const totalUsers = await User.countDocuments()

        const users = await User.find({})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })

        res.status(200).json({
            users,
            page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// Create new user
const createUser = async (req, res) => {
    const { name, email, password, role } = req.body

    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || "customer"
        })

        res.status(201).json({
            message: "User created successfully",
            user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// Update user
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.role = req.body.role || user.role

        const updatedUser = await user.save()

        res.json({
            message: "User updated successfully",
            user: updatedUser
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        await user.deleteOne()
        res.json({ message: "User deleted successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}
