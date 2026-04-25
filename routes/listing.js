const express = require('express');
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner, validateListing} = require('../middleware.js');

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const path = require("path");

// === LOCAL STORAGE (working now) ===
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "public", "uploads")),
    filename: (req, file, cb) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + unique + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// === CLOUDINARY STORAGE (uncomment after replacing .env credentials) ===
// const { storage } = require("../cloudConfig.js");
// const upload = multer({ storage });

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

