const cookieSession = require('cookie-session')
const express = require('express')
const app = express()
const port = 8000
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const session = require('express-session')
const authRoutes = require('./routes/auth')
const keys = require('./config/keys')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser') // parse cookie header

// Connect to mongodb
mongoose.connect(keys.MONGODB_URI, () => {
    console.log('Connected to mongo db')
})

// Use & parse cookies
app.use(
    cookieSession({
        name: 'session',
        keys: [keys.COOKIE_KEY],
        maxAge: 24 * 60 * 60 * 1000
    })
)

app.use(cookieParser())

// Initialize passport
app.use(passport.initialize())

// Deserialize cookie from the browser
app.use(passport.session())

// Set up cors to allow us to accept requests from our client
app.use(
    cors({
        origin: 'http://localhost:3000', // allow to server to accept request from different origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true // allow session cookie from browser to pass through
    })
)

// Set up routes
app.use('/auth', authRoutes)

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: 'user has not been authenticated'
        })
    } else {
        next()
    }
}

/* If it's already login, send the profile response,
otherwise, send a 401 response that the user is not authenticated
authCheck before navigating to home page
*/ 
app.get('/', authCheck, (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: 'user successfully authenticated',
        user: req.user,
        cookies: req.cookies
    })
})

// Connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}`))