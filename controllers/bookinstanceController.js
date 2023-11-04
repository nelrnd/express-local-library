const BookInstance = require("../models/bookinstance")
const Book = require("../models/book")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator")

exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec()

  res.render("bookinstance_list", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  })
})

exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec()

  if (bookInstance === null) {
    const err = new Error("Book copy not found")
    err.status(404)
    return next(err)
  }

  res.render("bookinstance_detail", {
    title: "Book:",
    bookinstance: bookInstance,
  })
})

exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title").exec()

  res.render("bookinstance_form", {
    title: "Create Book Instance",
    book_list: allBooks,
  })
})

exports.bookinstance_create_post = [
  // Validate and sanitize fields
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  // Process request
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    })

    if (!errors.isEmpty()) {
      const allBooks = await Book.find({}, "title").exec()

      res.render("bookinstance_form", {
        title: "Create Book Instance",
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookInstance: bookInstance,
      })
      return
    } else {
      await bookInstance.save()
      res.redirect(bookInstance.url)
    }
  }),
]

exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id).exec()

  if (bookInstance === null) {
    res.redirect("/catalog/bookinstances")
  }

  res.render("bookinstance_delete", {
    title: "Delete book instance",
    book_instance: bookInstance,
  })
})

exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  await BookInstance.findByIdAndRemove(req.body.bookinstanceid)
  res.redirect("/catalog/bookinstances")
})

exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  const [bookInstance, allBooks] = await Promise.all([
    BookInstance.findById(req.params.id).populate("book").exec(),
    Book.find({}, "title").exec(),
  ])

  if (bookInstance === null) {
    const err = new Error("Book instance not found")
    err.status = 404
    return next(err)
  }

  res.render("bookinstance_form", {
    title: "Update book instance",
    bookinstance: bookInstance,
    book_list: allBooks,
    selected_book: bookInstance.book._id,
  })
})

exports.bookinstance_update_post = [
  // Validate and sanitize fields
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  // Process request
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id,
    })

    if (!errors.isEmpty()) {
      res.render("bookinstance_form", {
        title: "Update book instance",
        bookinstance: bookInstance,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
      })
      return
    } else {
      const updatedBookInstance = await BookInstance.findByIdAndUpdate(
        req.params.id,
        bookInstance
      )
      res.redirect(updatedBookInstance.url)
    }
  }),
]
