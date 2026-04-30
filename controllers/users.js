const User = require('../models/user');

module.exports.renderSignupForm = (req, res) => {
    res.render('user/signup.ejs', { title: 'Signup' });
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
    
        req.login(registeredUser, err => {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("/signup");
            }
            req.flash("success", "Successfully registered and logged in!");
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('user/login.ejs');
};

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome to StayHub! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
           return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};