const GOOGLE_TOKENS = {
    GOOGLE_CONSUMER_ID: "your-google-api-id",
    GOOGLE_CONSUMER_SECRET: "your-google-api-secret"
}

const DB_USER = "database-user"
const DB_PASSWORD = "database-password"
const MONGODB = {
    MONGODB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.y5cw6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}

const SESSION = {
    COOKIE_KEY: 'some-secret-key'
}

const KEYS = {
    ...GOOGLE_TOKENS,
    ...MONGODB,
    ...SESSION
}

module.exports = KEYS