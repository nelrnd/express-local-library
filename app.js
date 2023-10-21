const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const catalogRouter = require("./routes/catalog")

const app = express()

// Set up mongoose connection
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const mongoDB =
  "mongodb+srv://admin:FLBHidIuaxwF9jAo@cluster0.tgjhaka.mongodb.net/?retryWrites=true&w=majority"
main().catch((err) => console.error(err))
async function main() {
  await mongoose.connect(mongoDB)
}

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/catalog", catalogRouter)

module.exports = app
