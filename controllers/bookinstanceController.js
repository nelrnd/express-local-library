const BookInstance = require("../models/bookinstance")
const asyncHandler = require("express-async-handler")

exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - BookInstance list")
})

exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet - BookInstance detail: ${req.params.id}`)
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
