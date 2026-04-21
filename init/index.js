const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URL = 'mongodb://localhost:27017/wanderlust';

main()
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    const listingsWithOwner = initData.data.map((obj) => ({ ...obj, Owner: '69e4b14ae472e4781d349841'}));
    await Listing.insertMany(listingsWithOwner);
    console.log("Database initialized with sample data.");
}

initDB();