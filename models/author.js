const mongoose = require("mongoose")

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: Date,
  date_of_death: Date,
})

AuthorSchema.virtual("name").get(() => {
  let fullname = ""
  if (this.first_name && this.last_name) {
    fullname = `${this.first_name} ${this.last_name}`
  }
  return fullname
})

AutorSchema.virtual("url").get(() => {
  return `/catalog/author/${this._id}`
})

module.exports = mongoose.model("Author", AuthorSchema)