// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
// }

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// // Safety check for environment variables
// const cloudName = process.env.CLOUD_NAME?.trim();
// const apiKey = process.env.CLOUD_API_KEY?.trim();
// const apiSecret = process.env.CLOUD_API_SECRET?.trim();

// if (cloudName && apiKey && apiSecret) {
//     cloudinary.config({
//         cloud_name: cloudName,
//         api_key: apiKey,
//         api_secret: apiSecret,
//     });

//     cloudinary.api.ping()
//         .then((res) => console.log("CLOUDINARY CONNECTED:", res.status))
//         .catch((err) => console.log("CLOUDINARY AUTH ERROR:", err.message));
// } else {
//     console.log("CLOUDINARY: Missing credentials in environment variables.");
// }


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: "Wanderlust_DEV",
//         allowedFormats: ["png", "jpg", "jpeg", "webp"],
//     },
// });

// module.exports = { cloudinary, storage };


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Wanderlust_DEV",
        allowedFormats: ["png", "jpg", "jpeg"],
    },
});

module.exports = { cloudinary, storage };