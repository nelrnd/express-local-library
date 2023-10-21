const Book = require("../models/book")
const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Site Home Page")
})

exports.book_list = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Book list")
})

exports.book_detail = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet - Book detail: ${req.params.id}`)
})

exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Book create GET")
})

exports.book_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Book create POST")
})

exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Book delete GET")
})

exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Book delete POST")
})

exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Book update GET")
})

exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Book update POST")
})
