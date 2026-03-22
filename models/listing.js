const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    images: {
        type: String,
        default: "https://in.pinterest.com/pin/871798440377323170/",
        set: (v) => v === "" ? "https://in.pinterest.com/pin/871798440377323170/" : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;