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
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,

    // geometry: {
    //     type: {
    //         type: String,
    //         enum: ["Point"],
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number], // [lng, lat]
    //         required: true
    //     }
    // },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    Owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    // coordinates: {
    //     type: [Number],
    //     required: true
    // }
});


listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;