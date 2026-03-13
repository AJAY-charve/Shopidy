const Order = require("../models/Order")

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit)

        const skip = (page - 1) * limit

        const totalOrders = await Order.countDocuments()

        const orders = await Order.find({})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate("user", "name email")

        res.status(200).json({
            orders,
            page,
            totaPages: Math.ceil(totalOrders / limit),
            totalOrders
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name")

        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        order.status = req.body.status || order.status

        if (req.body.status === "Delivered") {
            order.isDelivered = true
            order.deliveredAt = Date.now()
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        await order.deleteOne()
        res.json({ message: "Order removed successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = {
    getAllOrders,
    updateOrderStatus,
    deleteOrder
}
