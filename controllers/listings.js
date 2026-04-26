const Listing = require("../models/listing");
const axios = require("axios");

// module.exports.index = async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index",  {allListings});
// };

module.exports.index = async (req, res) => {
    let { category } = req.query;
    let filter = {};

    if (category) {
        filter.category = category;
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs');
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid listing ID!");
        return res.redirect("/listings");
    }

    const listing = await Listing.findById(id).populate({path:"reviews", populate: { path: "author",}, }).populate("Owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "..", filename);
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.images = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect(`/listings`);
}

// module.exports.createListing = async (req, res) => {
//     try {
//         console.log("BODY =", req.body);
//         console.log("FILE =", req.file);

//         if (!req.file) {
//             req.flash("error", "Please select an image!");
//             return res.redirect("/listings/new");
//         }

//         const fullLocation = `${req.body.listing.location}, ${req.body.listing.country}`;

//         let lat = 28.6139;
//         let lng = 77.2090;

//         try {
//             const geoResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
//                 params: {
//                     q: fullLocation,
//                     format: "json",
//                     limit: 1
//                 },
//                 headers: {
//                     "User-Agent": "StayProject/1.0"
//                 }
//             });

//             if (geoResponse.data.length > 0) {
//                 lat = parseFloat(geoResponse.data[0].lat);
//                 lng = parseFloat(geoResponse.data[0].lon);
//             }
//         } catch (geoErr) {
//             console.log("Geo error:", geoErr.message);
//         }

//         const newListing = new Listing(req.body.listing);
//         newListing.Owner = req.user._id;

//         // Local storage: serve via Express static from /uploads
//         newListing.images = {
//             url: `/uploads/${req.file.filename}`,
//             filename: req.file.filename
//         };

//         newListing.geometry = {
//             type: "Point",
//             coordinates: [lng, lat]
//         };

//         await newListing.save();

//         req.flash("success", "New Listing Created!");
//         res.redirect(`/listings/${newListing._id}`);

//     } catch (err) {
//         console.log("FINAL CREATE ERROR =", err);
//         req.flash("error", err.message);
//         res.redirect("/listings/new");
//     }
// };

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = "";

    if (listing.images && listing.images.url) {
        originalImageUrl = listing.images.url;
    }

    res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== 'undefined') {
        listing.images = {
            url: `/uploads/${req.file.filename}`,
            filename: req.file.filename
        };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect('/listings');
};