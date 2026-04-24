const express = require('express');
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner, validateListing} = require('../middleware.js');

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

// Debug + error-handling wrapper for multer uploads
// const handleUpload = (fieldName) => {
//     return (req, res, next) => {
//         const uploadMiddleware = upload.single(fieldName);
//         uploadMiddleware(req, res, (err) => {
//             if (err) {
//                 console.error("[multer/upload error]", err);
                
//                 // Specific message for Cloudinary 403 authentication errors
//                 if (err.http_code === 403 || err.message?.includes('403')) {
//                     req.flash("error", "Image upload failed: Cloudinary access denied (403). Please verify your CLOUD_NAME, API_KEY, and API_SECRET in the .env file.");
//                 } else if (err.message?.includes('unexpected status code')) {
//                     req.flash("error", `Image upload failed: Cloudinary server error (${err.http_code || 'unknown'}). Check your Cloudinary credentials and account status.`);
//                 } else {
//                     req.flash("error", `Image upload failed: ${err.message}`);
//                 }
                
//                 return res.redirect(req.originalUrl || "/listings/new");
//             }
//             console.log("[handleUpload] req.file:", req.file);
//             console.log("[handleUpload] req.body:", req.body);
//             next();
//         });
//     };
// };


router
  .route('/')
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn, 
        upload.single("listing[images]"), 
        validateListing, 
        wrapAsync(listingController.createListing)
    );


// NEW ROUTE
router.get('/new', isLoggedIn, listingController.renderNewForm );


router
   .route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[images]"), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//Edit Route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;

