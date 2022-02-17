const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user')

// Serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// Deserialize the cookie UserId to user in database
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user)
        })
        .catch((err) => {
            done(new Error('Failed to deserialize an user'))
        })
})

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.GOOGLE_CONSUMER_ID, // or use clientID
            clientSecret: keys.GOOGLE_CONSUMER_SECRET, // or use clientSecret
            callbackURL: '/auth/google/callback'
        },
        async (token, tokenSecret, profile, done) => {
            // Find current user in UserModel
            const currentUser = await User.findOne({
                googleId: profile._json.id_str
            })
            // Create new user if the database doesn't have this user
            if (!currentUser) {
                const newUser = await new User({
                    name: profile._json.name,
                    screenName: profile.displayName,
                    googleId: profile.id,
                    avatar: profile._json.picture
                }).save()
                if (newUser) {
                    done(null, newUser)
                }
            }
            done(null, currentUser)
        }
    )
)