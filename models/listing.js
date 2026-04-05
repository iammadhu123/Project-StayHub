const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    images: {
        type: String,
        default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;