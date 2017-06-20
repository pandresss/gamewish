// this is where tims bcrypt started. implemented with my page.




const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
const PORT = process.env.PORT || 3000;




app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());

app.use(passport.session());

app.use(logger('dev'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(flash());


// ==========================user set up


const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    console.log('----------------------------------------');
    console.log('in passport.serializeUser callback');
    console.log('user: ');
    console.log(user);

    done(null, user);
});

passport.deserializeUser((userObj, done) => {
    console.log('----------------------------------------');
    console.log('in passport.deserializeUser callback');
    console.log('userObj: ');
    console.log(userObj);

    User
        .findByEmail(userObj.email)
        .then((user) => done(null, user))
        .catch((err) => {
            console.log('ERROR:', err);
            return done(null, false);
        });
});

passport.use(
    'local-signup',
    new LocalStrategy({
            // these are the names of the fields for email and password in
            // the login form we'll be serving (see the view)
            usernameField: 'user[email]',
            passwordField: 'user[password]',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User
                .create(req.body.user)
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    console.log('ERROR:', err);
                    return done(null, false);
                });
        })
);

passport.use(
    'local-login',
    new LocalStrategy({
            usernameField: 'user[email]',
            passwordField: 'user[password]',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User
                .findByEmail(email)
                .then((user) => {
                    if (user) {
                        // here we use bcrypt to figure out whether the user is logged in or not
                        const isAuthed = bcrypt.compareSync(password, user.password_digest);

                        if (isAuthed) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    } else {
                        return done(null, false);
                    }
                });
        })
);




// =====================end of user

app.use('/users', require('./controller/users'));


app.use(require('./router'));

app.listen(PORT, () => console.log('Server is up and running on port', PORT));
