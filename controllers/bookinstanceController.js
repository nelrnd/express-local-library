const BookInstance = require("../models/bookinstance")
const asyncHandler = require("express-async-handler")

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
  res.send("Not implemented yet - BookInstance create GET")
})

exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - BookInstance create POST")
})

exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - BookInstance delete GET")
})

exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - BookInstance delete POST")
})

exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - BookInstance update GET")
})

exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - BookInstance update POST")
})
