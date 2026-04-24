if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Trim whitespace from env variables - common cause of 403 errors
const cloudName = process.env.CLOUD_NAME ? process.env.CLOUD_NAME.trim() : '';
const apiKey = process.env.CLOUD_API_KEY ? process.env.CLOUD_API_KEY.trim() : '';
const apiSecret = process.env.CLOUD_API_SECRET ? process.env.CLOUD_API_SECRET.trim() : '';
const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET ? process.env.CLOUDINARY_UPLOAD_PRESET.trim() : '';


cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});

console.log(`☁️  Cloudinary config: cloud_name=${cloudName}, api_key=${apiKey ? '***' + apiKey.slice(-4) : 'MISSING'}`);
if (uploadPreset) {
    console.log(`☁️  Using upload preset: ${uploadPreset}`);
}

// Build storage params - include upload preset if provided
const storageParams = {
    folder: 'Wanderlust_DEV',
    allowed_formats: ['jpeg', 'png', 'jpg'],
    resource_type: 'auto' // Auto-detect resource type (image/video)
};

// If upload preset is configured, use it (helps with restricted accounts)
if (uploadPreset) {
    storageParams.upload_preset = uploadPreset;
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: storageParams,
});

module.exports = {
    cloudinary,
    storage,
    uploadPreset,
}

