const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoute = require("./routes/userRoutes")
const productRoute = require("./routes/productRoutes")
const cartRoute = require("./routes/cartRoutes")
const checkoutRoute = require("./routes/checkoutRoutes")
const orderRoutes = require("./routes/orderRoutes")
const uplodeRoutes = require("./routes/uploadRoutes")
const subscriberRoute = require("./routes/subscribeRoute")
const adminRoutes = require("./routes/adminRoutes")
const productAdminRoutes = require("./routes/productAdminRoutes")
const orderAdminRoutes = require("./routes/adminOrderRoutes")

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

// connect mongodb
connectDB()

// API routes
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/checkout", checkoutRoute)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uplodeRoutes)
app.use("/api", subscriberRoute)
app.use("/api/admin/users", adminRoutes)
app.use("/api/admin/products", productAdminRoutes)
app.use("/api/admin/orders", orderAdminRoutes)

// port and listening
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`server is running on http local host ${PORT}`);

})