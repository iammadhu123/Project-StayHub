const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);

    if (listing.Owner.toString() === req.user._id.toString()) {
        req.flash("error", "You cannot review your own hosted place!");
        return res.redirect(`/listings/${listing._id}`);
    }

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "Review added!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
    let { reviewId, id } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
};