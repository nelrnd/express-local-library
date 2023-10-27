const Author = require("../models/author")
const Book = require("../models/book")
const asyncHandler = require("express-async-handler")

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

exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Author create GET")
})

exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Author create POST")
})

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
