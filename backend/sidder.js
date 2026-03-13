const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");

const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");

dotenv.config();

// DB CONNECT
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.log(err));

// CONSTANT DATA
const categories = ["Top Wear", "Bottom Wear"];

const brands = [
    "Urban Threads",
    "Fashionista",
    "ChicStyle",
    "Street Vogue",
    "Modern Fit"
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Red", "Blue", "Black", "White", "Green", "Grey"];
const materials = ["Cotton", "Denim", "Wool", "Silk"];
const genders = ["Men", "Women", "Unisex"];

// IMAGE GENERATOR
const generateImages = () => {
    const count = faker.number.int({ min: 2, max: 4 });

    return Array.from({ length: count }).map(() => ({
        url: `https://picsum.photos/400/400?random=${faker.string.uuid()}`,
        altText: "Product Image"
    }));
};

// PRODUCT NAME BASED ON CATEGORY
const getProductName = (category, gender) => {
    if (category === "Top Wear") {
        return faker.helpers.arrayElement([
            `${gender} Cotton T-Shirt`,
            `${gender} Casual Shirt`,
            `${gender} Hoodie`,
            `${gender} Sweatshirt`
        ]);
    }

    return faker.helpers.arrayElement([
        `${gender} Denim Jeans`,
        `${gender} Casual Trousers`,
        `${gender} Joggers`,
        `${gender} Shorts`
    ]);
};

// MAIN PRODUCT GENERATOR
const generateProducts = (userId) => {
    const products = [];

    categories.forEach((category) => {
        genders.forEach((gender) => {
            for (let i = 0; i < 20; i++) {
                const price = faker.number.int({ min: 799, max: 3999 });
                const discount = faker.number.int({ min: 200, max: 600 });

                products.push({
                    name: getProductName(category, gender),
                    description: faker.commerce.productDescription(),
                    price,
                    discountPrice: price - discount,
                    countInStock: faker.number.int({ min: 5, max: 50 }),
                    sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
                    category,
                    brand: faker.helpers.arrayElement(brands),
                    sizes: faker.helpers.shuffle(sizes).slice(0, 3),
                    colors: faker.helpers.shuffle(colors).slice(0, 3),
                    collections: category,
                    material: faker.helpers.arrayElement(materials),
                    gender,
                    images: generateImages(),
                    isPublished: true,
                    rating: faker.number.int({ min: 3, max: 5 }),
                    numReviews: faker.number.int({ min: 0, max: 120 }),
                    user: userId
                });
            }
        });
    });

    return products;
};

// SEED FUNCTION
const seedData = async () => {
    try {
        console.log("🧹 Cleaning Database...");

        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        const admin = await User.create({
            name: "Admin",
            email: "admin@example.com",
            password: "123456",
            role: "admin"
        });

        const products = generateProducts(admin._id);

        await Product.insertMany(products);

        console.log(`✅ Seeder completed | Total Products: ${products.length}`);
        process.exit();
    } catch (error) {
        console.error("❌ Seeder failed", error);
        process.exit(1);
    }
};

seedData();
