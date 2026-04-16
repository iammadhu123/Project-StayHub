const express = require('express');
const app = express();
const users = require('./routes/user.js');
const posts = require('./routes/post.js');
const session = require('express-session');
const flash = require('connect-flash');
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 


const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => { //middleware
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register", (req, res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;

    if(name == "anonymous") {
        req.flash("success", "user not registered");
    }else{
        req.flash("success", "user registered successfully!");
    }
    res.redirect("/hello");
})

app.get("/hello", (req, res) => {
    // res.send(`Hello! ${req.session.name}`);
    // console.log(req.flash("success"));
    // res.locals.successMsg = req.flash("success");
    // res.locals.errorMsg = req.flash("error");
    res.render("page.ejs", { name: req.session.name});
})

// app.use(
//     session({ 
//         secret: "mysupersecretstring", 
//         resave: false, 
//         saveUninitialized: true 
//     })
// );

// app.get("/reqcount", (req, res) => {
//     if (req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }

//     res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//     res.send("test successful!")
// })





// const cookieParser = require('cookie-parser');

// // app.use(cookieParser());
// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req,res) => {
//     res.cookie("made-in", "India", {signed: true});
//     res.send('signed cookie sent');
// })

// app.get("/verify", (req, res) => {
//     // console.log(req.cookies);//unsigned cookies print
//     console.log(req.signedCookies); //signed cookies print
//     res.send("verified");
// })

// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "Namaste");
//     res.cookie("madeIn", "India");
//     res.send("sent you some cookies!");
// })

// app.get('/greet', (req, res) => {
//     let { name = "anonymous" } = req.cookies;
//     res.send(`Hi, ${name}`);
// })
// app.get('/', (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hi, I am root")
// })

// app.use('/users', users);
// app.use('/posts', posts);

app.listen(3000, () => {
    console.log("server is listening to 3000");
})