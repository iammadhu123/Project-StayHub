const express = require('express');
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema } = require('../schema.js');
const Listing = require('../models/listing.js');

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


//Index Route
router.get('/', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index",  {allListings});
}));

//NEW ROUTE
router.get('/new', async (req, res) => {
    res.render('listings/new.ejs');
})

//Show Route

router.get('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ExpressError(400, "Invalid listing ID!");
    }
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!")
        res.redirect("/listings");
        // throw new ExpressError(404, "Listing not found!");
    }
    res.render("listings/show", {listing});
}));


//Create Route
router.post('/', validateListing,  wrapAsync(async (req, res, next) => {
    // let {title, description, image, price, location, country} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect('/listings');

}));

//Edit Route
router.get('/:id/edit', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!")
        res.redirect("/listings");
        // throw new ExpressError(404, "Listing not found!");
    }
    res.render('listings/edit', {listing});
}));

//Update Route
router.put('/:id', validateListing, wrapAsync(async (req, res) => {
    // if(!req.body.listing) {
    //     throw new ExpressError(400, "Send valid data for listing");
    // }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

//DELETE ROUTE
router.delete('/:id', wrapAsync(async (req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect('/listings');
}));


module.exports = router;
