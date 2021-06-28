const asyncHandler = require('../middleware/async');

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: 'Get bootcamps' });
});
