const Cart = require("../models/Cart")
const Product = require("../models/Product")

// helper function
const getCart = async (userId) => {
    if (userId) return await Cart.findOne({ user: userId })
    return null
}

// Add product to cart ( user)
const addToCart = async (req, res) => {
    const { productId, quantity, size, color, userId } = req.body

    try {
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        let cart = await getCart(userId)

        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            )

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                })
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + Number(item.price) * Number(item.quantity),
                0
            )

            await cart.save()
            return res.status(200).json(cart)
        }

        if (!userId) {
            return res.status(400).json({ message: " userId required" });
        }

        const newCart = await Cart.create({
            user: userId || undefined,
            products: [{
                productId,
                name: product.name,
                image: product.images[0].url,
                price: product.price,
                size,
                color,
                quantity
            }],
            totalPrice: product.price * quantity
        })

        res.status(201).json(newCart)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// Update product quantity
const updateCartItem = async (req, res) => {
    const { productId, quantity, size, color, userId } = req.body

    try {
        const cart = await getCart(userId)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        )

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" })
        }

        if (quantity > 0) {
            cart.products[productIndex].quantity = quantity
        } else {
            cart.products.splice(productIndex, 1)
        }

        cart.totalPrice = cart.products.reduce(
            (acc, item) => acc + Number(item.price) * Number(item.quantity),
            0
        )

        await cart.save()
        res.json(cart)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// Remove product from cart
const removeFromCart = async (req, res) => {
    const { productId, size, color, userId } = req.body

    const cart = await getCart(userId)
    console.log(cart);

    if (!cart) return res.status(404).json({ message: "Cart not found" })

    const productIndex = cart.products.findIndex(
        (p) =>
            p.productId.toString() === productId &&
            p.size.toLowerCase() === size.toLowerCase() &&
            p.color.toLowerCase() === color.toLowerCase()
    );

    if (productIndex === -1) return res.status(404).json({ message: "Product not found in cart" })
    cart.products.splice(productIndex, 1)
    cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
    )
    await cart.save()
    res.json(cart)
}


// Get cart
const getUserCart = async (req, res) => {
    const { userId } = req.query

    try {
        const cart = await getCart(userId)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }
        res.json(cart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = {
    addToCart,
    updateCartItem,
    removeFromCart,
    getUserCart
}
