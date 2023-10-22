const Genre = require("../models/genre")
const asyncHandler = require("express-async-handler")

exports.genre_list = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet - Genre list")
})

exports.genre_detail = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet - Genre detail: ${req.params.id}`)
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