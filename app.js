const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const compression = require("compression")
const helmet = require("helmet")
const RateLimit = require("express-rate-limit")

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const catalogRouter = require("./routes/catalog")

const app = express()

// Set up mongoose connection
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const dev_db_url =
  "mongodb+srv://admin:FLBHidIuaxwF9jAo@cluster0.tgjhaka.mongodb.net/?retryWrites=true&w=majority"

const mongoDB = process.env.MONGODB_URI || dev_db_url

main().catch((err) => console.error(err))
async function main() {
  await mongoose.connect(mongoDB)
}

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(compression())

// Add helmet to the middleware chain
// Set CSP headers to allow Bootstrap and Jqueryt to be served
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
)

// Set up rate limiter: maximum of twenty reqyests per minute
const limiter = RateLimit({
  windowsMs: 1 * 60 * 1000,
  max: 20,
})
// Apply rate limiter to all requests
app.use(limiter)

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/catalog", catalogRouter)

module.exports = app
