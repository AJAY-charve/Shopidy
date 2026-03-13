const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        discountPrice: Number,
        countInStock: { type: Number, default: 0 },
        sku: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        brand: String,
        sizes: [String],
        colors: [String],
        collections: String,
        material: String,
        gender: { type: String, enum: ["Men", "Women", "Unisex"] },

        images: [
            {
                url: { type: String, required: true },
                altText: String,
            }
        ],

        isFeatured: { type: Boolean, default: false },
        isPublished: { type: Boolean, default: false },

        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },

        tags: [String],

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema)
