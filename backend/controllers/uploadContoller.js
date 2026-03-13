const cloudinary = require("cloudinary").v2
const streamifier = require("streamifier")
const dotenv = require("dotenv")
dotenv.config()

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Upload an image to Cloudinary
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "fashion-store" },
                    (error, result) => {
                        if (result) resolve(result)
                        else reject(error)
                    }
                )
                streamifier.createReadStream(buffer).pipe(stream)
            })
        }

        const result = await streamUpload(req.file.buffer)
        res.status(201).json({ imageUrl: result.secure_url })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Upload failed" })
    }
}

module.exports = {
    uploadImage
}
