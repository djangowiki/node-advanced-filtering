const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  // Fetch the record from the database.
  let bootcamp = await Bootcamp.find();
  // Check if their are any query parameters in the url.
  if (req.query) {
    // Fetch and return only data that matches those query parameters
    // http://localhost:5000/api/v1/bootcamps/?location.state=MA&housing=true
    bootcamp = await Bootcamp.find(req.query);
    return res
      .status(200)
      .json({ success: true, count: bootcamp.length, data: bootcamp });
  }
  // Return the record normally, which means, all records.
  res
    .status(200)
    .json({ success: true, count: bootcamp.length, data: bootcamp });
  next();
});

exports.getBootcampsRegex = asyncHandler(async (req, res, next) => {
  // A better way of doing this filtering is to use regex
  // This is the kind of filtering we could do with something like.
  // http://localhost:5000/api/v1/bootcamps/regex?averageCost[lte]=12000

  // Create Query String.
  let queryStr;
  queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(
    /\b(lt|lte|gt|gte|in)\b/g,
    (match) => `$${match}`
  );
  const bootcamps = await Bootcamp.find(JSON.parse(queryStr));
  return res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

exports.getBootcampsRegexSelect = asyncHandler(async (req, res, next) => {
  // Set query and remove select and sort from query.
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ['select', 'sort'];
  removeFields.forEach((params) => delete reqQuery[params]);
  // Filter records.
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(lt|lte|gt|gte|in)\b/g,
    (match) => `$${match}`
  );
  query = await Bootcamp.find(JSON.parse(queryStr));
  if (req.query.select) {
    const selectQuery = req.query.select.split(',').join(' ');
    console.log(selectQuery);
    // query = query.select(selectQuery);
  }
  res.status(200).json({ success: true, count: query.length, data: query });
});
