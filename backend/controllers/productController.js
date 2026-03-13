const Product = require("../models/Product")

const createProduct = async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            user: req.user._id
        })

        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        Object.keys(req.body).forEach((key) => {
            product[key] =
                req.body[key] !== undefined ? req.body[key] : product[key]
        })

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        await product.deleteOne()
        res.json({ message: "Product removed" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
}

// GET ALL PRODUCTS (PUBLIC + FILTERS)
const getProducts = async (req, res) => {
    try {
        const {
            collection,
            size,
            color,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            page = 1,
            limit = 12
        } = req.query;

        const decode = (v) =>
            v ? decodeURIComponent(v).replace(/\+/g, " ") : v;

        let query = {};

        if (decode(collection) && decode(collection).toLowerCase() !== "all") {
            query.collections = decode(collection);
        }

        if (decode(category) && decode(category).toLowerCase() !== "all") {
            query.category = decode(category);
        }

        if (material) query.material = { $in: material.split(",") };
        if (brand) query.brand = { $in: brand.split(",") };
        if (size) query.sizes = { $in: size.split(",") };
        if (color) query.colors = { $in: color.split(",") };
        if (gender) query.gender = gender;

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        let sort = {};
        if (sortBy === "priceAsc") sort.price = 1;
        if (sortBy === "priceDesc") sort.price = -1;

        const skip = (Number(page) - 1) * Number(limit);

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        res.json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};


// GET PRODUCT BY ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }

        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
}

// BEST SELLER
const getBestSeller = async (req, res) => {
    try {
        const product = await Product.findOne().sort({ rating: -1 })

        if (!product) {
            return res.status(404).json({ message: "No best seller found" })
        }

        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}

// NEW ARRIVALS
const getNewArrivals = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .limit(8)

        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
}

// SIMILAR PRODUCTS
const getSimilarProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }

        const similarProducts = await Product.find({
            _id: { $ne: product._id },
            gender: product.gender,
            category: product.category
        }).limit(4)

        res.json(similarProducts)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
    getBestSeller,
    getNewArrivals,
    getSimilarProducts
}
