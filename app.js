const express = require('express');
const app = express();
const mongoose = require('mongoose');

const path = require('path'); // ejs files are in views folder
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
// const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');

const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/wanderlust';

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
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")))

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));

app.get('/', (req, res) => {
    res.send('Hi, I am root');
});

// const validateListing = (req, res, next) => {
//     let {error} = listingSchema.validate(req.body);
//     if(error) {
//         let errMsg = error.details.map((el) => el.message).join(",")
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// }

app.use("/listings", listings);
app.use('/listings/:id/reviews', reviews);

app.use((req, res, next) => {
    next(new ExpressError(404, 'Page not found'));
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
