const Order = require("../models/Order")

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const skip = (page - 1) * limit

        const totalOrders = await Order.countDocuments()

        const orders = await Order.find({ user: req.user._id })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })

        res.status(200).json({
            orders,
            page,
            totalPage: Math.ceil(totalOrders / limit),
            totalOrders
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// Get order details by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email")

        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        if (
            order.user._id.toString() !== req.user._id.toString() &&
            !req.user.isAdmin
        ) {
            return res.status(403).json({ message: "Not authorized" })
        }

        res.json(order)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = {
    getMyOrders,
    getOrderById
}
