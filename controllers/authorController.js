const Author = require("../models/author")
const Book = require("../models/book")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator")

exports.author_list = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ family_name: 1 }).exec()

  res.render("author_list", { title: "Author list", author_list: allAuthors })
})

exports.author_detail = asyncHandler(async (req, res, next) => {
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary")
      .sort({ title: 1 })
      .exec(),
  ])

  if (author === null) {
    const err = new Error("Author not found")
    err.status = 404
    return next(err)
  }

  res.render("author_detail", {
    title: "Author detail: " + author.name,
    author: author,
    author_books: allBooksByAuthor,
  })
})

exports.author_create_get = (req, res, next) => {
  res.render("author_form", { title: "Create Author" })
}

exports.author_create_post = [
  // Validate and sanitize fields
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name must contain only alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name must contain only alphanumeric characters"),
  body("date_of_birth", "Invalid date of birth.")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    })

    if (!errors.isEmpty()) {
      res.render("author_form", {
        title: "Create Author",
        author: author,
        errors: errors.array(),
      })
      return
    } else {
      await author.save()
      res.redirect(author.url)
    }
  }),
]

exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Author delete GET")
})

exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Author delete POST")
})

exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Author update GET")
})

exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Author update POST")
})
