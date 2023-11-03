const mongoose = require("mongoose")
const { DateTime } = require("luxon")

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: Date,
  date_of_death: Date,
})

AuthorSchema.virtual("name").get(function () {
  let fullname = ""
  fullname = `${this.first_name} ${this.family_name}`
  return fullname
})

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`
})

AuthorSchema.virtual("lifespan").get(function () {
  let dates = ""
  if (!this.date_of_birth) {
    return "unknown"
  }
  dates += this.date_of_birth.getFullYear() + " - "
  if (this.date_of_death) {
    dates += this.date_of_death.getFullYear()
  } else {
    dates += "now"
  }
  return dates
})

AuthorSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate()
})

AuthorSchema.virtual("date_of_death_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toISODate()
})

module.exports = mongoose.model("Author", AuthorSchema)
