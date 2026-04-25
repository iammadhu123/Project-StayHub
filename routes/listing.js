const express = require('express');
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner, validateListing} = require('../middleware.js');

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const path = require("path");

// Local disk storage for development (Cloudinary account has 403 upload restriction)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});
const upload = multer({ storage });

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

