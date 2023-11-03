const Genre = require("../models/genre")
const Book = require("../models/book")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator")

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

exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" })
}

exports.genre_create_post = [
  // Validate and sanitize the name field
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    const genre = new Genre({ name: req.body.name })

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      })
      return
    } else {
      const genreExists = await Genre.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec()
      if (genreExists) {
        res.redirect(genreExists.url)
      } else {
        await genre.save()
        res.redirect(genre.url)
      }
    }
  }),
]

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  const [genre, allGenreBooks] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }).exec(),
  ])

  if (genre === null) {
    res.redirect("/catalog/genres")
  }

  res.render("genre_delete", {
    title: "Delete genre",
    genre: genre,
    genre_books: allGenreBooks,
  })
})

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  const [genre, allGenreBooks] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }).exec(),
  ])

  if (allGenreBooks.length > 0) {
    res.render("genre_delete", {
      title: "Delete genre",
      genre: genre,
      genre_books: allGenreBooks,
    })
    return
  } else {
    await Genre.findByIdAndRemove(req.body.genreid)
    res.redirect("/catalog/genres")
  }
})

exports.genre_update_get = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id).exec()

  if (genre === null) {
    const err = new Error("Genre not found")
    err.status = 404
    return next(err)
  }

  res.render("genre_form", { title: "Update genre", genre: genre })
})

exports.genre_update_post = [
  // Validate and sanitize the name field
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id,
    })

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Update genre",
        genre: genre,
        errors: errors.array(),
      })
      return
    } else {
      const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, genre)
      res.redirect(updatedGenre.url)
    }
  }),
]
