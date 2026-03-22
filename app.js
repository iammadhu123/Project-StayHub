const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path'); // ejs files are in views folder
const methodOverride = require('method-override');

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.use(express.urlencoded({extended: true})); // To parse form data
app.use(methodOverride("_method"));

app.get('/', (req, res) => {
    res.send('Hi, I am root');
});

//Index page to show all listings //Index Route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index",  {allListings});
})

//NEW ROUTE
app.get('/listings/new', async (req, res) => {
    res.render('listings/new.ejs');
})

//Show Route
app.get('/listings/:id', async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);

    console.log("Listing:", listing); // 👈 debug

    if (!listing) {
        return res.send("Listing not found ❌");  // ya redirect bhi kar sakte ho
    }

    res.render("listings/show", {listing});
})

//Create Route
app.post('/listings', async (req, res) => {
    // let {title, description, image, price, location, country} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
})

//Edit Route
app.get('/listings/:id/edit', async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing })
})

//Update Route
app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//DELETE ROUTE
app.delete('/listings/:id', async (req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect('/listings');
})

// app.get('/testListing', async (req,res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "A beautiful villa with a stunning view of the ocean.",
//         price: 2000,
//         location: "Malibu, California",
//         country: "USA",
//     });

//     await sampleListing.save();
//     console.log("sample was saved")
//     res.send("Sample listing created and saved to the database.");
// })

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

