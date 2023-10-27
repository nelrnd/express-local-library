const Genre = require("../models/genre")
const Book = require("../models/book")
const asyncHandler = require("express-async-handler")

exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ name: 1 }).exec()
  res.render("genre_list", { title: "Genre list", genre_list: allGenres })
})

exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ])

  if (genre === null) {
    const err = new Error("Genre not found")
    err.status = 404
    return next(err)
  }

  res.render("genre_detail", {
    title: "Genre detail",
    genre: genre,
    genre_books: booksInGenre,
  })
})

exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Genre create GET")
})

exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Genre create POST")
})

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Genre delete GET")
})

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Genre delete POST")
})

exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Genre update GET")
})

exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Genre update POST")
})
