const Checkout = require("../models/Checkout")
const Cart = require("../models/Cart")
const Order = require("../models/Order")

// Create checkout
const createCheckout = async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout" })
    }

    try {
        const checkout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false,
            isFinalized: false
        })

        res.status(201).json(checkout)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// Mark checkout as paid
const markCheckoutPaid = async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body

    try {
        const checkout = await Checkout.findById(req.params.id)

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" })
        }

        if (checkout.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" })
        }

        if (paymentStatus !== "paid") {
            return res.status(400).json({ message: "Invalid payment status" })
        }

        checkout.isPaid = true
        checkout.paymentStatus = "paid"
        checkout.paymentDetails = paymentDetails
        checkout.paidAt = Date.now()

        await checkout.save()
        res.json(checkout)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// Finalize checkout and create order
const finalizeCheckout = async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id)

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" })
        }

        if (checkout.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" })
        }

        if (!checkout.isPaid) {
            return res.status(400).json({ message: "Checkout not paid" })
        }

        if (checkout.isFinalized) {
            return res.status(400).json({ message: "Checkout already finalized" })
        }

        const order = await Order.create({
            user: checkout.user,
            orderItems: checkout.checkoutItems,
            shippingAddress: checkout.shippingAddress,
            paymentMethod: checkout.paymentMethod,
            totalPrice: checkout.totalPrice,
            isPaid: true,
            paidAt: checkout.paidAt,
            paymentStatus: "paid",
            paymentDetails: checkout.paymentDetails,
            isDelivered: false
        })

        checkout.isFinalized = true
        checkout.finalizedAt = Date.now()
        await checkout.save()

        await Cart.findOneAndDelete({ user: checkout.user })

        res.status(201).json(order)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = {
    createCheckout,
    markCheckoutPaid,
    finalizeCheckout
}
