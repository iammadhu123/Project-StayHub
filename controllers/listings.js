const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index",  {allListings});
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

// module.exports.createListing = async (req, res) => {
//     try {
//         console.log("[createListing] req.body:", req.body);
//         console.log("[createListing] req.file:", req.file);
//         console.log("[createListing] req.user:", req.user);
//         const newListing = new Listing(req.body.listing);
//         newListing.Owner = req.user._id;
//         if (req.file) {
//             newListing.images = { 
//                 url: req.file.path, 
//                 filename: req.file.filename 
//             };
//         }
//         await newListing.save();
//         console.log(`New listing created: ${newListing._id}`);
//         console.log(`Image URL: ${newListing.images?.url}`);
//         req.flash("success", "New listing created!");
//         res.redirect(`/listings/${newListing._id}`);
//     } catch (e) {
//         console.error("Create listing error:", e);
//         req.flash("error", "Failed to create listing!");
//         res.redirect("/listings/new");
//     }
// };

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.Owner = req.user._id;
    newListing.images = { url, filename };
    newListing.geometry = {
        type: "Point",
        coordinates: [77.2090, 28.6139] // Delhi (lng, lat)
    };

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect('/listings');
};

// module.exports.renderEditForm = async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", "Listing you requested for does not exist!")
//         return res.redirect("/listings");
//     }

//     let originalImageUrl = listing.images.url;
//     originalImageUrl = originalImageUrl.replace("/upload", '/upload/h_300,w_250/'); // Add width transformation for thumbnail display
   
//     res.render('listings/edit', {listing, originalImageUrl});
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
        originalImageUrl = listing.images.url.replace(
            "/upload",
            "/upload/h_300,w_250/"
        );
    }

    res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== 'undefined') {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.images = { url, filename };
    await listing.save();
    };
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect('/listings');
};